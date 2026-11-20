---
title: "2026 ICPC Asia Seoul Regional Finals Solution Sketches"
date: "2026-11-21 00:38:59"
categories: ["ICPC"]
tags: ["ICPC"]
---

**Disclaimer:** This is an **unofficial** analysis of some possible ways to solve the problems of the 2026 ICPC Asia Seoul Regional Finals. They are not intended to give complete solutions, but rather to outline some approaches that can be used to solve the problems. If you find an error, please [send me an email](https://youngyojun.github.io/about/) about it.


**Live Solutions Presentation**: [https://www.youtube.com/live/SRL9GUXGMXo?t=11867](https://www.youtube.com/live/SRL9GUXGMXo?t=11867)


## K. Stepping Numbers

Start a queue with $1, 2, \ldots, 9$. Whenever $v$ is popped, let $d = v \bmod 10$ and append $10v + d - 1$ if $d > 0$, followed by $10v + d + 1$ if $d < 9$.

This generates the stepping numbers in increasing order: numbers of a smaller length come first, and the order within each length is preserved. There are only about $160\,000$ stepping numbers below $10^{15}$, so one can simply generate them and take the $n$-th. The time and space complexity is $\mathcal{O}( n )$.


## G. Glowing Devices

Work backwards. A device that is not forced on can be viewed as a unit-time job with deadline $n-t_i$, whose reward is the saved payment $w_i$.

Sort the devices by increasing deadline and insert their rewards into a min-heap. Whenever the number of jobs in the heap exceeds the current deadline, remove the smallest reward and pay for that device instead. The heap contains a maximum-weight feasible set of devices that can be activated for free.

The overall time complexity is $\mathcal{O}( n \log n )$.


## D. Circuit X

Consider any two pins. If their orders in the upper and lower layers differ, their wires must cross exactly once: either above the middle layer, at cost $a$, or below it, at cost $b$. Their minimum contribution is therefore $\min(a, b)$.

If their orders agree, the wires can cross neither layer or both layers, giving a minimum contribution of $\min(0, a + b)$.

These pairwise lower bounds can be attained simultaneously. Depending on the signs and relative values of $a$ and $b$, choose the middle permutation to be the upper permutation, the lower permutation, or the reverse of either one.

Let $I$ be the number of pairs whose orders differ between the two given permutations. The answer is

$$
I \min(a, b) + \left( \binom{n}{2} - I \right) \min(0, a + b) \text{.}
$$

Compute $I$ by inversion counting in $\mathcal{O}( n \log n )$ time.


## E. Drones

Classify the drones in the order **Inner**, **Boundary**, and **Outer**.

For **Inner**, first check whether the point lies on a polygon edge; such a point is Inner. Otherwise, ordinary ray casting suffices. Shoot a horizontal ray to the right and count its intersections with the polygon boundary. An odd count means inside, and an even count means outside. Handle vertices using the standard half-open convention.

Once a drone is known not to be Inner, it is **Boundary** exactly when its distance to the polygon is at most $d$. Geometrically, the points within distance $d$ of the boundary form the union of radius-$d$ disks around the vertices and width-$2d$ rectangles along the edges.

Testing a disk is immediate. For the rectangle around segment $AB$, write $u = P - A$ and $v = B - A$. The point belongs to the rectangle if and only if

$$
0 \le u \cdot v \le v \cdot v \text{,}
\qquad
(u \times v)^2 \le d^2 (v \cdot v) \text{.}
$$

The first inequality checks whether the orthogonal projection lies on the segment, and the second checks its distance to the supporting line. Any remaining drone is **Outer**. With $s$ polygon edges and $n$ drones, the time complexity is $\mathcal{O}( sn )$. All comparisons can be made with integer arithmetic.


## B. Boss Raid Log

Let $P$ be the required spell sequence and $S$ the recorded sequence. An occurrence chooses the spells of $P$ in order, with consecutive chosen positions at least $d$ apart. We need to determine whether every position in $S$ belongs to some occurrence.

Find $L_j$, the earliest possible position of the $j$-th spell, by greedily matching $P$ from left to right. Similarly, find $R_j$, the latest possible position, from right to left. If the greedy matching fails, the answer is `NO`.

A position $i$ can serve as the $j$-th spell of some occurrence if and only if

$$
S_i = P_j \qquad \text{and} \qquad L_j \le i \le R_j \text{.}
$$

For sufficiency, concatenate an earliest possible prefix, position $i$, and a latest possible suffix. The spacing constraints are preserved.

Thus each $j$ contributes an interval $[L_j, R_j]$ for the spell type $P_j$. Sweep $i = 1, \ldots, n$, activating intervals when their left endpoints are reached. For each spell type $c$, maintain the largest right endpoint $\operatorname{reach}[c]$ among the activated intervals of that type. Position $i$ is covered precisely when $\operatorname{reach}[S_i] \ge i$.

The time and space complexity is $\mathcal{O}( n + m + k )$.


## J. Safe

Choose one of the given edit-cost tables, partition $Y$ into at least two nonempty pieces, and minimize the maximum edit distance from $X$ to a piece.

Binary-search a threshold $T$. For a fixed cost table, check whether $Y$ admits a partition in which every piece has edit distance at most $T$. The usual edit-distance DP can process all possible starting positions of the current piece together, rather than restarting a DP for each substring.

After reading a prefix of $Y$, let $i$ denote the number of characters of $X$ processed in the current piece. Maintain two edit-distance rows:

- $f[i]$: the current piece is still the first piece.
- $g[i]$: at least one earlier piece has already been completed with cost at most $T$.

For the next character of $Y$, apply the usual insertion, deletion, and replacement transitions to both rows. When a row reaches $i = |X|$ with cost at most $T$, the current piece may end. Starting with the **next** character, a new piece may begin in $g$, initialized using the costs of deleting a prefix of $X$. This restart is merged with the continuing states by taking minima.

Two details are important. A partition consisting of just one piece is invalid, so accept only when the final $g[|X|] \le T$. Empty pieces are also invalid: finish a piece only after consuming a character of $Y$, and start the next piece only when another character arrives.

A sufficient upper bound is $T = 9 |X|$, obtained by dividing $Y$ into nonempty pieces of length at most $|X|$. The time complexity is $\mathcal{O}( k |X| |Y| \log |X| )$, using $\mathcal{O}( |X| )$ DP space per cost table.


## M. Workbench

Let $F_i = \sum_{t = 1}^{i} f_t$, and let $D_i$ be the minimum cost of processing the first $i$ steps. If the last batch comprises steps $j + 1, \ldots, i$, then

$$
D_i = \min_{j \text{ valid}} \left\{ D_j + \max\left( b (F_i - F_j), \; a (s_j + s_i) \right) \right\} \text{,}
$$

where $j$ is valid exactly when $\sum_{t = j + 1}^{i - 1} s_t \le m$.

Set $u_j = b F_j + a s_j$ and $v_i = b F_i - a s_i$. Splitting the maximum at $u_j = v_i$ gives

$$
D_i = \min\left\{
  b F_i + \min_{\substack{j \text{ valid} \\ u_j < v_i}}(D_j - b F_j) , \quad
  a s_i + \min_{\substack{j \text{ valid} \\ u_j \ge v_i}}(D_j + a s_j)
\right\} \text{.}
$$

Coordinate-compress the $u_j$ values and maintain two range minima in a segment tree. At step $i$, insert $j = i - 1$ and remove old indices whose intermediate parts no longer fit on the workbench. Because the sizes are positive, the valid $j$ form a contiguous interval, so this can be maintained with a moving left endpoint.

Query the prefix $u_j < v_i$ and the suffix $u_j \ge v_i$. The time complexity is $\mathcal{O}( n \log n)$, with $\mathcal{O}(n)$ space.


## I. Potion Shop

Write each pile size as $a_i = p q_i + r_i$, where $0 \le r_i < p$. Define

$$
X = \bigoplus_i q_i , \qquad R = \sum_i r_i \pmod p \text{.}
$$

The position is losing for the player to move if and only if $X = R = 0$.

To see why, consider a losing position. A move affecting only one pile must change either its quotient, hence the xor, or the sum of remainders modulo $p$. A move removing fewer than $p$ crystals in total also changes the latter by a nonzero amount unless a quotient changes; in that case the quotient xor cannot remain zero when only one quotient is changed.

Conversely, if $X \ne 0$, use the usual Nim move to decrease one quotient so that the xor becomes zero, choosing the new remainder so that the total remainder sum is zero modulo $p$. If $X = 0$ but $R \ne 0$, remove exactly $R$ crystals from the remainder parts, without changing any quotient.

For each update, remove the old quotient and remainder from these two aggregates and insert the new ones. The total time complexity is $\mathcal{O}( n + q )$.


## A. Baduk Solitaire

Ignore empty cells and compress consecutive stones of the same color into runs. We may assume that each removal deletes an entire run: a partially removed run can be finished when it would otherwise disappear.

It is also safe to join the ends and consider the runs on a circle. A removal crossing this artificial cut can be postponed until the runs between the two ends have been cleared, after which the saved end stones can be removed together.

If there is only one circular run, the answer is `YES` exactly when it contains at least two stones. Otherwise, let there be $2h$ alternating runs, and call a run of size one a *singleton*. The answer is

$$
\texttt{YES} \quad \Longleftrightarrow \quad
\text{the longest circular block of singletons has length } < h \text{.}
$$

A block of $h$ consecutive singletons is an obstruction that survives every legal removal. In the other direction, if no such block exists, one can remove a nonsingleton run adjacent to an appropriate longest block and preserve the condition with $h$ decreased by one. This proves sufficiency by induction.

The criterion can be checked in $\mathcal{O}(n)$ time.


## L. Summoning Triangle

Count triangles containing exactly one stone of each color, including the three vertices. Fix a directed side $pq$, rotate the coordinates so that $p$ is the origin and $q$ lies on the positive $y$-axis, and consider only candidate third vertices $r$ to the left of $pq$.

For another point $s$ on this side, the condition $s \in \operatorname{int}(pqr)$ is equivalent to

$$
\operatorname{slope}(ps) < \operatorname{slope}(pr) , \qquad
\operatorname{slope}(qs) > \operatorname{slope}(qr) \text{.}
$$

Sweep the candidate points $r$ in increasing $p$-slope. The first condition is then handled by the sweep; membership in the triangle depends only on a threshold in the ordering around $q$.

Assign each point a rank $t(r)$ increasing with its $q$-slope. For each color $c$, maintain the two largest ranks encountered so far, $A[c]$ and $B[c]$, using zero for missing colors and a maximum sentinel for the colors of $p$ and $q$. Skip a side whose endpoints have the same color.

After inserting $r$, its triangle is valid precisely when

$$
\min_{c} A[c] = t(r) , \qquad \max_{c} B[c] < t(r) \text{.}
$$

Indeed, $r$ supplies its own color, and every other color must have exactly one processed point whose rank is above the threshold.

For a fixed $pq$, maintain a histogram of the current maxima $A[c]$. Every maximum can only increase, so a pointer to the smallest occupied rank moves in one direction and takes $\mathcal{O}(n)$ time in total. Also maintain $M = \max_{c} B[c]$. When a color's previous maximum is $u$ and the new point has rank $t$, update $M \gets \max(M, \min(u, t))$. Thus each step of the sweep costs amortized $\mathcal{O}(1)$.

Pre-sort the angular order around every point. The resulting deterministic algorithm takes $\mathcal{O}( n^3 )$ time and $\mathcal{O}( n^2 )$ space.

An $\mathcal{O}( n^3 \log k )$ variant maintains the maxima in an ordered structure, but its implementation must be efficient to meet the time limit. There is also a randomized $\mathcal{O}( n^3 )$ approach using hashing.


## F. [Erin Needs Cake](https://www.trickcal.com/)

We are given a triangulation of a simple polygon, possibly with interior vertices. The cake lies inside one triangular face, and a query asks whether it lies inside a simple loop along the given edges. We are allowed at most $\lceil \log_2 n \rceil$ queries.

The key is to remove boundary triangles one by one while ensuring that the remaining union is still a topological disk. A triangle is removable if it has at least two edges on the current boundary, or if it has exactly one boundary edge and its opposite vertex is an **interior** vertex. In the second case, removing the triangle exposes that interior vertex on the new boundary. If the opposite vertex is already on the boundary, removing the triangle may disconnect or pinch the remaining region and is not allowed.

Keep a queue of removable candidates, rechecking the condition whenever a candidate is popped. After removing one face, only its neighbors need to be reconsidered. Record the removal order $r_1 , r_2 , \ldots , r_n$, keeping the last face. Every suffix

$$
\{ r_j , r_{j + 1} , \ldots , r_n \}
$$

has a single simple boundary.

Let the unknown face be $r_h$. Query the boundary of the suffix beginning at the midpoint $j$. The answer is `1` exactly when $h \ge j$, so an ordinary binary search locates $h$ in at most $\lceil \log_2 n \rceil$ queries.

To construct a query, an edge belongs to the suffix boundary exactly when it has one adjacent face in the suffix and the other outside it. Follow these edges to recover the cycle. The removed prefix need not be a simple polygon, so querying the prefix—or an arbitrary interval in the removal order—is not generally valid.

The total time complexity is $\mathcal{O}( n \log n )$ and the space complexity is $\mathcal{O}(n)$.

## C. Chemistry Experiment

Count safe strings of length $n$ over $0, 1, \ldots, k$, where adjacent nonzero symbols must agree and every symbol $1, \ldots, k$ must appear.

First allow only $j$ nonzero symbols, without requiring all of them. Let $H_n(j)$ be the number of such strings. By inclusion–exclusion, the answer modulo $m$ is

$$
\sum_{j = 0}^{k} (-1)^{k - j} \binom{k}{j} H_n(j) \text{.}
$$

To compute $H_n(j)$, let $z_t$ and $w_t$ count safe prefixes of length $t$ ending in zero and nonzero, respectively. Then

$$
\begin{pmatrix}
  z_{t + 1} \\
  w_{t + 1}
\end{pmatrix}
=
\begin{pmatrix}
  1 & 1 \\
  j & 1
\end{pmatrix}
\begin{pmatrix}
  z_t \\
  w_t
\end{pmatrix} , \qquad
\begin{pmatrix}
  z_0 \\
  w_0
\end{pmatrix}
=
\begin{pmatrix}
  1 \\
  0
\end{pmatrix} \text{.}
$$

Hence $H_n(j) = z_n + w_n$, which can be computed by binary exponentiation of a $2 \times 2$ matrix. Evaluate the inclusion–exclusion sum in $\mathcal{O}( k \log n )$ time, using $\mathcal{O}(k)$ space.


## H. Last Jump

Let $X$ be the string constructed so far and $T$ the given string. A useful invariant is that the current position $i$ is the earliest ending position of an occurrence of $X$ in $T$.

When we append a character $c$, no occurrence of $Xc$ can end before or at $i$. If $T[i + 1] = c$, its earliest ending position is $i + 1$, so this move is not a jump. Otherwise, the next state is the earliest ending position of $Xc$ later in $T$, and the move is a jump. If the extension does not occur, the move is illegal.

A suffix automaton compresses substrings with the same set of ending positions; they have the same legal extensions and jump behavior. For a transition $v \xrightarrow{c} u$, it is a jump exactly when

$$
\operatorname{first}[u] > \operatorname{first}[v] + 1 \text{,}
$$

where $\operatorname{first}[v]$ is the earliest ending position represented by state $v$.

Let $W[v][b]$ indicate whether the current player can win, where $b = 1$ means the current player will win if no further jump occurs. At a terminal state with $\operatorname{first}[v] = |T|$, set $W[v][b] = b$. For a move to $u$, the opponent's flag is $1 - b$ if the move does not jump, and $0$ if it does. Thus the current player can win if any legal transition satisfies

$$
\begin{cases}
\neg W[u][1 - b] , & \text{no jump} , \\
\neg W[u][0] , & \text{jump} \text{.}
\end{cases}
$$

Evaluate the states in decreasing order of represented substring length and return $W[\mathrm{root}][1]$. The time complexity is $\mathcal{O}( |\Sigma| \, |T| )$ per string.
