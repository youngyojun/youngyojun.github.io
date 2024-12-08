/*
 * Efficient Offline Pattern Counting under Dynamic Updates
 * A Near-Linear Time Approach for Complex Sequence Queries
 *
 * Gyojun Youn
 *
 * Department of Computer Science and Engineering
 * Seoul National University
 *
 * youngyojun [at] snu [dot] ac [dot] kr
 * youn [dot] gyojun [at] gmail [dot] com
 *
 */

#include <algorithm>
#include <cstring>
#include <utility>

const int INF = 0x3f3f3f3f;		// Infinity
const int MAXN = 100'000 + 55;	// N <= 100'000
const int MAXQ = 250'000 + 55;	// Q <= 250'000
const int MAXLV = 19;			// Q < 2 ** (MAXLV - 1)
const int MX = 1 << 17;			// N + O(1) < 2 ** MX

/*
 * Full Binary Segment Tree
 *
 * It enables the finding of the other endpoint
 * of the laminar tree edge with a given endpoint (i, x)
 */

int seg[MX * 2];

void upd(int i, int x) {
	i += MX - 1; seg[i] = x; i >>= 1;
	while (i) {
		seg[i] = std::max(seg[i << 1], seg[i << 1 | 1]);
		i >>= 1;
	}
}

int getL(int i, int x) {
	for (i += MX - 2; (i & (i - 1)) && seg[i] < x;) i = (i - 1) >> 1;
	if (seg[i] < x) return 0;
	while (i < MX) {
		i <<= 1;
		i |= (x <= seg[i | 1]);
	}
	return x == seg[i] ? i + 1 - MX : 0;
}

int getR(int i, int x) {
	for (i += MX; (i & (i + 1)) && seg[i] < x;) i = (i + 1) >> 1;
	if (seg[i] < x) return 0;
	while (i < MX) {
		i <<= 1;
		i |= (seg[i] < x);
	}
	return x == seg[i] ? i + 1 - MX : 0;
}

/*
 * Merged laminar tree edge
 * 
 * Weight c, joining x = s and x = e with y = y
 */

struct LINE {
	int s, e, y, c;
} E[MAXLV][MAXN];

/*
 * Compressed laminar graph
 */

struct GROUP {
	int s, e, i;
} G[MAXLV][MAXN];

/*
 * Auxiliary variables
 */

int _B[MAXLV][MAXQ];
int NI[MAXLV][MAXN];

struct EVNODE { int i, y, e; } EV[MAXN]; int EVn;
LINE NE[MAXN];
int QV[MAXQ+MAXN], QVs[MAXN], QVdeg[MAXN], _QVi[MAXN];
bool isNes[MAXN];

LINE LNE[MAXN], RNE[MAXN], SLNE[MAXN];
int SLNEdeg[MAXN], SLNEi[MAXN];
int FH[MAXLV][MAXN], _FH[MAXLV][MAXN], AST[MAXN];
bool visited[MAXN], dead[MAXN];

/*
 * Problem Variables
 */

int A[MAXN];			// A[1 .. N]
int B[MAXQ], C[MAXQ];	// Set A[B[i]] := C[i] for i = 1 .. Q

int Ans[MAXQ];			// Ans[0] := initial, Ans[i] := after i-th query
int N, Q;

/*
 * Coordinate Compression using Binary Search
 */

int idxToGidx(const int lv, const int x, const int X) {
	if (!x) return 0;
	int s = 1, e = X, m;
	while (s < e) {
		m = (s + e) >> 1;
		if (x < G[lv][m].s) e = m - 1;
		else if (G[lv][m].e < x) s = m + 1;
		else return m;
	}
	return s;
}

/*
 * Make compressed laminar graph for the next level lv + 1
 */
void make(const int lv, const int X, int &En) {
	memcpy(G[lv + 1], G[lv], (X + 1) * sizeof(GROUP));
	for (int i = X; i; i--) if (FH[lv][i]) G[lv + 1][i].i = 0;
	int LNEn = 0;
	memset(visited, 0, (X + 1) * sizeof(bool));

	for (int i = 1, x; i <= X; i++) if (FH[lv][i]) {
		x = idxToGidx(lv, getL(G[lv][i].s, FH[lv][i]), X);
		if (!x) continue;
		if (FH[lv][x]) {
			visited[x] = true;
			RNE[x] = {x, i, FH[lv][i], 1};
		} else LNE[++LNEn] = {x, i, FH[lv][i], 1};
	}
	for (int i = X, x; i; i--) if (FH[lv][i] && !visited[i]) {
		x = idxToGidx(lv, getR(G[lv][i].s, FH[lv][i]), X);
		if (x) {
			visited[i] = true;
			RNE[i] = {i, x, FH[lv][i], 1};
		}
	}

	memset(SLNEdeg, 0, (X + 1) * sizeof(int));
	for (int i = LNEn; i; i--) SLNEdeg[LNE[i].s]++;
	SLNEi[1] = 1;
	for (int i = 1; i < X; i++) SLNEi[i + 1] = SLNEi[i] + SLNEdeg[i];
	for (int i = LNEn; i; i--) SLNE[SLNEi[LNE[i].s]++] = LNE[i];

	memcpy(LNE + 1, SLNE + 1, LNEn * sizeof(LINE));
	memset(dead, 0, (En + 1) * sizeof(bool));
	for (int x = 1, i = 1, n = 0; x <= X; x++) {
		while (n && E[lv][AST[n]].e == x) n--;
		while (i <= En && E[lv][i].s == x) {
			AST[++n] = i;
			i++;
		}
		while (n && E[lv][AST[n]].y <= FH[lv][x]) {
			dead[AST[n]] = true;
			n--;
		}
	}

	int NEn = 0;
	int ei = 1, li = 1, rx = 1;
	std::pair<int, int> ert, lrt, rrt, mnrt;
	const std::pair<int, int> infs(INF, INF);
	while (true) {
		while (ei <= En && dead[ei]) ei++;
		while (rx <= X && !visited[rx]) rx++;
		if (En < ei && LNEn < li && X < rx) break;

		ert = ei <= En ? std::make_pair( E[lv][ei].s, -E[lv][ei].y ) : infs;
		lrt = li <= LNEn ? std::make_pair( LNE[li].s, -LNE[li].y ) : infs;
		rrt = rx <= X ? std::make_pair( RNE[rx].s, -RNE[rx].y ) : infs;

		mnrt = std::min({ ert, lrt, rrt });
		if (mnrt == ert) E[lv + 1][++NEn] = E[lv][ei++];
		else if (mnrt == lrt) E[lv + 1][++NEn] = LNE[li++];
		else E[lv + 1][++NEn] = RNE[rx++];
	}
	En = NEn;
}

int getEVNesIdx(const int y) {
	if (y < EV[EVn].y) return 0;
	int s = 1, e = EVn, m;
	while (s < e) {
		m = (s + e) >> 1;
		if (EV[m].y <= y) e = m;
		else s = m + 1;
	}
	return EV[s].i;
}

/*
 * Main Divde & Conquer Logic
 *
 * Solve queries [qsi .. qei] with En laminar edges
 *
 * En = O(qei - qsi + 1)
 * Sum of (qei - qsi) for all recursions = O(q lg q)
 */

void solve(const int lv, const int qsi, const int qei, int X, int En, int hidden) {
	/*
	 * Trivial case) only one query
	 */

	if (qsi == qei) {
		const int x = B[qsi], y = C[qsi], idx = G[lv][x].s;

		// Find new edge if exists
		if (getL(idx, y)) hidden++;
		if (getR(idx, y)) hidden++;

		// Iterate all En edges and check validity
		for (int i = En; i; i--)
			if (E[lv][i].e < x || x < E[lv][i].s || y < E[lv][i].y)
				hidden += E[lv][i].c;

		Ans[qsi] = hidden;
		return;
	}

	/*
	 * Preprocess laminar edges
	 */

	const int _X = X; X = 0;
	for (int i = 1; i <= _X; i++) {
		if (X && !G[lv][X].i && !G[lv][i].i)
			G[lv][X].e = G[lv][i].e;
		else G[lv][++X] = G[lv][i];
		NI[lv][i] = X;
	}
	memcpy(_B[lv] + qsi, B + qsi, (qei - qsi + 1) * sizeof(int));
	for (int i = qsi; i <= qei; i++) B[i] = NI[lv][B[i]];

	int n = 0;
	for (int i = 1; i <= En; i++) {
		E[lv][i].s = NI[lv][ E[lv][i].s ];
		E[lv][i].e = NI[lv][ E[lv][i].e ];
		if (E[lv][i].s == E[lv][i].e)
			hidden += E[lv][i].c;
		else E[lv][++n] = E[lv][i];
	}
	En = n;

	/*
	 * Counting sort the queries by B[i]
	 */

	memset(QVdeg, 0, (X + 1) * sizeof(int));
	for (int i = qsi; i <= qei; i++) QVdeg[B[i]]++;
	for (int i = 1; i < X; i++) QVs[i + 1] = QVs[i] + QVdeg[i] + 1;
	memcpy(_QVi, QVs, (X + 1) * sizeof(int));
	for (int i = qsi; i <= qei; i++) QV[_QVi[B[i]]++] = C[i];
	for (int i = X; i; i--) QV[_QVi[i]] = 0;
	memset(isNes, 0, (En+1) * sizeof(bool));

	/*
	 * Coordinate Compress the edges
	 *
	 * This step ensures that O(# of edges) = O(# of target queries)
	 * in the next level
	 */

	EVn = 0;
	for (int x = 1, i = 1; x <= X; x++) {
		while (EVn && EV[EVn].e == x) EVn--;
		while (i <= En && E[lv][i].s == x) {
			EV[++EVn] = {i, E[lv][i].y, E[lv][i].e};
			i++;
		}
		if (G[lv][x].i) isNes[ getEVNesIdx( A[ G[lv][x].s ] ) ] = true;
		int *it = QV + QVs[x];
		while (*it) {
			isNes[ getEVNesIdx(*it) ] = true;
			it++;
		}
	}
	const int _En = En;
	En = 1; NE[1] = E[lv][1];
	for (int i = 2; i <= _En; i++) {
		if (!isNes[i]
				&& NE[En].s == E[lv][i].s
				&& NE[En].e == E[lv][i].e)
			NE[En].c += E[lv][i].c;
		else NE[++En] = E[lv][i];
	}
	memcpy(E[lv], NE, (En + 1) * sizeof(LINE));

	const int qmi = (qsi + qei) >> 1;
	memset(FH[lv], 0, (X + 1) * sizeof(int));
	for (int i = X; i; i--) if (G[lv][i].i) FH[lv][i] = A[G[lv][i].s];
	for (int i = qsi; i <= qmi; i++) FH[lv][B[i]] = 0;
	for (int i = X; i; i--) if (FH[lv][i]) upd(G[lv][i].s, FH[lv][i]);

	/*
	 * Divide: solve the left part
	 */

	int leftEn = En;
	make(lv, X, leftEn);
	solve(lv + 1, qsi, qmi, X, leftEn, hidden);

	/*
	 * Now, the queries in the left part do not affect
	 *
	 * Update the laminar tree to reflect this
	 */

	for (int i = X; i; i--) if (FH[lv][i]) upd(G[lv][i].s, 0);
	memset(FH[lv], 0, (X + 1) * sizeof(int));
	for (int i = qsi; i <= qmi; i++) FH[lv][B[i]] = C[i];
	for (int i = X; i; i--) if (G[lv][i].i) {
		_FH[lv][i] = A[G[lv][i].s];
		if (FH[lv][i]) A[G[lv][i].s] = FH[lv][i];
	}
	for (int i = qmi + 1; i <= qei; i++) FH[lv][B[i]] = 0;
	for (int i = X; i; i--) if (FH[lv][i]) upd(G[lv][i].s, FH[lv][i]);

	/*
	 * Divide: solve the remaining right part
	 */

	int rightEn = En;
	make(lv, X, rightEn);
	solve(lv + 1, qmi + 1, qei, X, rightEn, hidden);

	for (int i = X; i; i--) if (G[lv][i].i) {
		A[G[lv][i].s] = _FH[lv][i];
		if (FH[lv][i]) upd(G[lv][i].s, 0);
	}
	memcpy(B + qsi, _B[lv] + qsi, (qei - qsi + 1) * sizeof(int));
}

namespace INIT {
	std::pair<int, int> V[MAXN];
	int I[MAXN];
	bool chk[MAXN];
	int Vn;

	void run(int &En) {
		/*
		 * Compute initial laminar tree for the main part
		 */

		for (int i = Q; i; i--) chk[B[i]] = true;
		Vn = En = 0;
		for (int i = 1; i <= N; i++) if (!chk[i]) {
			while (Vn && V[Vn].second < A[i]) Vn--;
			if (Vn && V[Vn].second == A[i]) {
				I[V[Vn].first] = i;
				V[Vn].first = i;
			} else V[++Vn] = {i, A[i]};
		}
		for (int i = 1; i <= N; i++) if (I[i])
			E[0][++En] = {i, I[i], A[i], 1 != i && i != N};
		for (int i = N; i; i--)
			G[0][i] = {i, i, chk[i]};
		for (int i = N; i; i--) if (!chk[i]) upd(i, A[i]);

		/*
		 * Compute Ans[0] using stack approach in O(n)
		 */

		Vn = 0;
		for (int i = 2; i < N; i++) {
			while (Vn && V[Vn].second < A[i]) Vn--;
			if (Vn && V[Vn].second == A[i]) Ans[0]++;
			else V[++Vn] = {i, A[i]};
		}
	}
}

void solve() {
	std::rotate(A + 1, A + N + 1, A + N + 2);
	A[1] = A[N+2] = INF;
	N += 2;
	for(int i = Q; i; i--) B[i]++;

	int En = 0;
	INIT::run(En);
	solve(0, 1, Q, N, En, 0);
}
