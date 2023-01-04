---
title: "이승진 교수님의 선형 대수학 후기"
date: 2023-01-05 02:44:08 +0900
categories:
 - Linear Algebra
tags:
 - 학교
 - 선형 대수학
 - 후기
---




선형 대수학 1을 들었어야 했는데, 단선대를 수강해버렸다. 심지어, 같이 듣기로 한 친구는 수강신청에 실패해버려서 이 과목을 들을 이유가 하나도 없었다.

교수님의 수업은 깔끔하고 담백하다. 교과서를 통해 큰 그림을 미리 그려가지 않으면, 수업만 듣고서는 무슨 이야기를 하시는지 하나도 이해하지 못할 수 있다.

사실, 나는 김명수 교수님의 선형 및 비선형 계산모델 수업을 들어서, 어려움이 전혀 없었다.

수업 시간마다 에거 교수님의 숙제를 풀었고, 모든 과제와 시험에서 만점을 받았다.

시험 문제는 교과서 연습 문제에서 가져오시는 듯 하다. 내가 푼 문제들을 가벼운 첨언을 얹어 적어본다.



## Midterm Exam

### Problem 1.

Solve as two triangular systems, without multiplying $LU$ to find $A$:

$$
LUx =
\begin{bmatrix}
1 & 0 & 0 \\
1 & 1 & 0 \\
1 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
2 & 4 & 4 \\
0 & 1 & 2 \\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
u \\
v \\
w
\end{bmatrix}
=
\begin{bmatrix}
2 \\
0 \\
2
\end{bmatrix}
$$

#### Sol)

$L (Ux) = b$로 두어 $Ux$의 값을 구하고, $Ux = c$를 풀자.

$L$이 lower triangular 하므로, $c$의 첫 번째 항부터 차례대로 알아낼 수 있다.

$$
Lc =
\begin{bmatrix}
1 & 0 & 0 \\
1 & 1 & 0 \\
1 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
* \\
* \\
*
\end{bmatrix}
=
\begin{bmatrix}
2 \\
0 \\
2
\end{bmatrix}
= b
\quad \Longrightarrow \quad
c =
\begin{bmatrix}
2 \\
-2 \\
0
\end{bmatrix}
$$

비슷하게, $U$가 upper triangular 하므로, $x$의 마지막 항부터 차례대로 알아낼 수 있다.

$$
Ux =
\begin{bmatrix}
2 & 4 & 4 \\
0 & 1 & 2 \\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
u \\
v \\
w
\end{bmatrix}
=
\begin{bmatrix}
2 \\
-2 \\
0
\end{bmatrix}
= c
\quad \Longrightarrow \quad
x =
\begin{bmatrix}
5 \\
-2 \\
0
\end{bmatrix}
$$

마지막으로, $LUx = b$가 되는지 검산을 하자. 나는 검산을 통해 산수 실수를 찾을 수 있었다. 아침 시험 첫 문제로 이런 문제는 틀리기 쉽다.

여담으로, 답이 틀리면 부분점수가 없었다.



### Problem 2.

Find the inverse of

$$
A =
\begin{bmatrix}
1 & 0 & 0 & 0 \\
1/4 & 1 & 0 & 0 \\
1/3 & 1/3 & 1 & 0 \\
1/2 & 1/2 & 1/2 & 1
\end{bmatrix}
$$

#### Sol)

$A$가 lower triangular하기 때문에, $A = L_1 L_2 \cdots L_k$ 꼴로 나타내면, $A^{-1} = L_k^{-1} \cdots L_1^{-1}$로 쉽게 계산할 수 있을 것 같다.

$$
A =
\begin{bmatrix}
1 & 0 & 0 & 0 \\
1/4 & 1 & 0 & 0 \\
1/3 & 0 & 1 & 0 \\
1/2 & 0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 1/3 & 1 & 0 \\
0 & 1/2 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 1/2 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

$$
A^{-1} =
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & -1/2 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & -1/3 & 1 & 0 \\
0 & -1/2 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 & 0 \\
-1/4 & 1 & 0 & 0 \\
-1/3 & 0 & 1 & 0 \\
-1/2 & 0 & 0 & 1
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 & 0 \\
-1/4 & 1 & 0 & 0 \\
-1/4 & -1/3 & 1 & 0 \\
-1/4 & -1/3 & -1/2 & 1
\end{bmatrix}
$$

1번처럼, $A^{-1} A = I$인지 검산을 하자. 분수가 섞여있어서 계산이 정말 하기 싫게 생겼지만, 해보면 정말 단순하고 짧은 산수뿐이다.



### Problem 3.

Let

$$
A =
\begin{bmatrix}
1 & 2 & 0 & 1 \\
0 & 1 & 1 & 0 \\
1 & 4 & 2 & 1
\end{bmatrix}
, \quad
b =
\begin{bmatrix}
1 \\
2 \\
5
\end{bmatrix}
\text{.}
$$

**(1)** Find the $LU$ decomposition of $A$, i.e., a lower triangular matrix $L$ that has only $1$'s on its main diagonal, and an echelon form $U$ such that $A = LU$.

**(2)** Write the complete solutions $x = x_p + x_n$ to $Ax = b$.

**(3)** Find a basis for the column space $C(A)$.

**(4)** Either find a left-inverse of $A$, or prove that there is no left-inverse of $A$.

#### Sol)

**(1)**

충분히 훈련되어 있어야 한다.

$$
A =
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 2 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
1 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 2 & 0 & 1 \\
0 & 1 & 1 & 0 \\
0 & 0 & 0 & 0
\end{bmatrix}
\quad \Longrightarrow \quad
L =
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 2 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
1 & 0 & 1
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
1 & 2 & 1
\end{bmatrix}
, \quad
U =
\begin{bmatrix}
1 & 2 & 0 & 1 \\
0 & 1 & 1 & 0 \\
0 & 0 & 0 & 0
\end{bmatrix}
$$

**(2)**

$L$이 invertible하므로, $Ax = b$는 $Ux = L^{-1}b =: c$와 동치다.

$$
c := L^{-1} b =
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
-1 & -2 & 1
\end{bmatrix}
\begin{bmatrix}
1 \\
2 \\
5
\end{bmatrix}
=
\begin{bmatrix}
1 \\
2 \\
0
\end{bmatrix}
$$

$U$의 zero row에 대응하는 $c$의 항이 $0$이다. 따라서, $c \in C(U)$이고, $Ux = c$는 해를 가진다.

먼저, 임의의 해 $x_p$를 구하자. pivot을 가지는 $U$의 columns으로 backward substitution을 하면 된다.

$$
\begin{bmatrix}
1 & 2 \\
0 & 1
\end{bmatrix}
\begin{bmatrix}
-3 \\
2
\end{bmatrix}
=
\begin{bmatrix}
1 \\
2
\end{bmatrix}
\quad \Longrightarrow \quad
U
\begin{bmatrix}
-3 \\
2 \\
0 \\
0
\end{bmatrix}
=
\begin{bmatrix}
1 \\
2 \\
0
\end{bmatrix}
= c
\quad \Longrightarrow \quad
x_p :=
\begin{bmatrix}
-3 \\
2 \\
0 \\
0
\end{bmatrix}
$$

$x_n \in N(U)$이다. $U$의 non-pivot column을 pivot columns의 선형 결합으로 표현하면 된다.

$$
U
\begin{bmatrix}
2 \\
-1 \\
1 \\
0
\end{bmatrix}
=
U
\begin{bmatrix}
-1 \\
0 \\
0 \\
1
\end{bmatrix}
= \mathbf{0}
\quad \Longrightarrow \quad
x_n = c_1
\begin{bmatrix}
2 \\
-1 \\
1 \\
0
\end{bmatrix}
+ c_2
\begin{bmatrix}
-1 \\
0 \\
0 \\
1
\end{bmatrix}
$$

**(3) - 쉬운 풀이**

$U$의 pivot이 있는 columns에 대응하는 $A$의 columns은 $C(A)$의 basis를 이룬다.

$$
C(A) =
\text{Span}
\left\{
\begin{bmatrix}
1 \\
0 \\
1
\end{bmatrix}
,
\begin{bmatrix}
2 \\
1 \\
4
\end{bmatrix}
\right\}
$$

**(3) - 좋아하는 풀이**

**(2)**의 풀이를 다시 보자. $b \in C(A)$라는 것은 $c = L^{-1}b$의 마지막 항이 $0$임과 동치다.

$$
b \in C(A)
\quad \Longleftrightarrow \quad
\begin{bmatrix}
-1 & -2 & 1
\end{bmatrix}
b = \mathbf{0}
\quad \Longleftrightarrow \quad
b \in N\left(
\begin{bmatrix}
-1 & -2 & 1
\end{bmatrix}
\right)
$$

이제, 행렬의 nullspace의 basis를 구하면 된다.

$$
C(A) =
\text{Span}
\left\{
\begin{bmatrix}
-2 \\
1 \\
0
\end{bmatrix}
,
\begin{bmatrix}
1 \\
0 \\
1
\end{bmatrix}
\right\}
$$

**(4)**

$A$의 왼쪽에 행렬을 곱한다는 것은, $A$의 rows로 선형 결합을 해서 새로운 rows를 만든다는 것이다. 따라서, $A$가 left-invertible 하려면, $\text{rank}(A) = 4$라야 한다.

하지만, $\text{rank}(A) \le 3$이다. 실제로, $\text{rank}(A) = \text{rank}(U) = 2$다. 따라서, $A$는 left-inverse를 가지지 않는다.



### Problem 4.

Construct a matrix with the required property, or explain why you can't.

**(1)** Dimension of nullspace = 1 + dimension of left nullspace.

**(2)** Row space = column space, nullspace ≠ left nullspace.

#### Sol)

**(1)**

$A$가 $m \times n$ 행렬이라면, $C(A)$와 $C\left( A^\mathsf{T} \right)$의 차원은 $r$로 같고, $\dim N(A) = n-r$, $\dim N\left( A^\mathsf{T} \right) = m-r$이다.

즉, $n = m+1$인 모든 행렬이 찾고자 하는 답이 된다. 가장 쉬운 예시는 이러하다.

$$
\begin{bmatrix}
0 & 0
\end{bmatrix}
$$

**(2)**

조금 당황했다. 시험 전까지 수업 때 배우지는 않았지만, 반드시 알아두어야 할 식이 하나 있다.

$$
C(A)^\bot = N\left( A^\mathsf{T} \right)
$$

증명은 $\subseteq$과 $\supseteq$로 나누어 하며, 그 서술은 기계가 한다. 나는 Gram-Schmidt로 $C(A)$의 Orthonormal basis를 잡고, $\mathbb{R}^m$의 orthonormal basis로 확장해서, 추가한 basis vectors가 $N\left( A^\mathsf{T} \right)$을 span한다는 아주 바보같은 서술을 했다. 여러분은 [이 증명](https://math.stackexchange.com/questions/3087270/proof-verification-the-orthogonal-complement-of-the-column-space-is-the-left-nu)에 익숙해지도록 하자.

저 중요한 성질을 알면, 찾고자 하는 행렬은 존재하지 않음을 쉽게 알 수 있다.

$$
N(A) = C\left( A^\mathsf{T} \right)^\bot = C(A)^\bot = N\left( A^\mathsf{T} \right)
$$

이 문제에서 점수가 꽤 갈렸던 거 같다.



### Problem 5.

For a positive integer $n > 2$ and two nonzero vectors $u, v \in \mathbb{R}^n$, consider a matrix $A = u u^\mathsf{T} + v v^\mathsf{T}$. What is the possible value of the rank of $A$?

#### Sol)

Rank에 대한 철학을 갖고 아래의 식을 보자.

$$
A = u u^\mathsf{T} + v v^\mathsf{T} =
\begin{bmatrix}
u & v
\end{bmatrix}
\begin{bmatrix}
u^\mathsf{T} \\
v^\mathsf{T}
\end{bmatrix}
$$

행렬 $A$를 $n \times 2$ 행렬과 $2 \times n$ 행렬의 곱으로 나타낼 수 있으므로, $\text{rank}(A) \le 2$다.

그리고, $A$의 rank는 $0$, $1$, $2$ 모두 가능하다. 각각, $u = v = \mathbb{0}$, $u = \mathbb{0}$ & $v \ne \mathbb{0}$, $u^\mathsf{T} v \ne 0$이면 된다.





## Final Exam

### Problem 1.

If $V$ is the subspace spanned by $(1, 1, 0, 1)$ and $(0, 0, 1, 0)$, find

**(1)** the projection matrix $P$ onto $V$.

**(2)** the vector in $V$ closest to the vector $b = (0, 1, 0, -1)$ in $V^\bot$.

**(3)** an orthonormal basis of $V^\bot$ containing $b$.

#### Sol)

**(1)**

$V$를 span하는 vectors가 orthogonal 하므로, 각 vector의 projection matrix $v v^\mathsf{T} / v^\mathsf{T} v$을 더하면 충분하다.

$$
P = \frac{1}{3}
\begin{bmatrix}
1 \\
1 \\
0 \\
1
\end{bmatrix}
\begin{bmatrix}
1 & 1 & 0 & 1
\end{bmatrix}
+
\begin{bmatrix}
0 \\
0 \\
1 \\
0
\end{bmatrix}
\begin{bmatrix}
0 & 0 & 1 & 0
\end{bmatrix}
=
\begin{bmatrix}
1/3 & 1/3 & 0 & 1/3 \\
1/3 & 1/3 & 0 & 1/3 \\
0 & 0 & 1 & 0 \\
1/3 & 1/3 & 0 & 1/3
\end{bmatrix}
$$

여담으로, 나는 상수 $1/3$을 놓쳐서 틀릴 뻔했다. Vector normalization을 먼저 하는 것도 좋은 습관일 것이다.

**(2)**

$b \in V^\bot$ 이므로, 더 볼 것 없이 답은 $\mathbf{0}$이다. $Pb = \mathbf{0}$인지 확인해도 좋다.

**(3)**

$(1, 1, 0, 1)$, $(0, 0, 1, 0)$, $(0, 1, 0, -1)$과 수직한 vector를 하나만 찾으면 된다.

$$
N\left(
\begin{bmatrix}
1 & 1 & 0 & 1 \\
0 & 1 & 0 & -1 \\
0 & 0 & 1 & 0
\end{bmatrix}
\right)
\ni
\begin{bmatrix}
-2 \\
1 \\
0 \\
1
\end{bmatrix}
$$

사실, $\lVert b \rVert \ne 1$라서, $b$를 포함하는 orthonormal basis는 없다. 센스있게 답을 적자.

$$
\left\{
\frac{1}{\sqrt{2}} b
, \ 
\frac{1}{\sqrt{6}}
\begin{bmatrix}
-2 \\
1 \\
0 \\
1
\end{bmatrix}
\right\}
$$


### Problem 2.

Let $A = \left( a_ {i j} \right)_ {1 \le i, j \le n}$ be the matrix defined by

$$
a_{i j} =
\begin{cases}
1 & \text{if } i - j = 0 \text{ or } 1, \\
-1 & \text{if } i - j = -1, \\
0 & \text{otherwise.}
\end{cases}
$$

Let $F_n$ be the determinant of $A$.

**(1)** Compute $F_{10}$.

**(2)** When $n = 10$, compute the last pivot of the matrix $A$.

#### Sol)

**(1)**

직접 해보면, $F_1 = 1$, $F_2 = 2$.

$n \ge 3$이면, 첫 열과 두 번째 열을 잡고 Laplace expansion을 하면, $F_ n = F_ {n-1} + F_ {n-2}$의 점화식을 얻는다. 교과서 연습 문제니깐 꼭 해볼 것.

고로, $F_{10} = 89$.

**(2)**

Submatrix의 determinant가 pivots의 곱과 같다는 성질을 사용하자. $A_ {10 \times 10}$의 $9 \times 9$ submatrix는 $A_ {9 \times 9}$와 같다.

따라서, $n = 10$일 때 $A$의 마지막 pivot의 값은 $F_ {10} / F_ 9 = 89 / 55$.

여담으로, 이 문제를 못 푼 학생이 꽤 있었다.



### Problem 3.

**(1)** For a real number $s$, let $\displaystyle A = \begin{bmatrix} 5 & s \\\\ s & 5 \end{bmatrix}$. Find a diagonal matrix $D$ and an orthogonal matrix $P$ such that $P^\mathsf{T} A P = D$.

**(2)** For which $s$ is $A$ positive definite?

**(3)** Find a matrix $B$ such that $B^2 = A$ when $s = 4$.

#### Sol)

**(1)**

평범한 대각화다. 충분히 훈련되어야 한다.

$$
D =
\begin{bmatrix}
5+s & 0 \\
0 & 5-s
\end{bmatrix}
, \ 
P = \frac{1}{\sqrt{2}}
\begin{bmatrix}
1 & 1 \\
1 & -1
\end{bmatrix}
\quad \Longrightarrow \quad
AP = PD
$$

$P$에 상수 $1 / \sqrt{2}$를 붙여야 함에 유의할 것.

**(2)**

고윳값 $5 \pm s$가 모두 양수라야 한다. 고로, $-5 < s < 5$.

**(3)**

행렬의 다양한 decomposition을 알아야 하고, 또한 각 decomposition이 어떻게 활용되는지 익혀두어야 한다.

$$
B := P \sqrt{D} P^\mathsf{T}
\quad \Longrightarrow \quad
B^2 = P \sqrt{D} P^\mathsf{T} P \sqrt{D} P^\mathsf{T} = P D P^\mathsf{T} = A
$$

$$
B = P \sqrt{D} P^\mathsf{T} = \left( \frac{1}{\sqrt{2}}
\begin{bmatrix}
1 & 1 \\
1 & -1
\end{bmatrix}
\right)
\begin{bmatrix}
\sqrt{5+s} & 0 \\
0 & \sqrt{5-s}
\end{bmatrix}
\left( \frac{1}{\sqrt{2}}
\begin{bmatrix}
1 & 1 \\
1 & -1
\end{bmatrix}
\right)
=
\begin{bmatrix}
2 & 1 \\
1 & 2
\end{bmatrix}
$$

$B$의 각 원소를 미지수로 두고 방정식을 푼 학생이 있다는데, 감각이 좋은 것 같다. $A$가 positive definite 하므로, 저러한 square root $B$는 유일하게 존재한다.



### Problem 4.

Let $\displaystyle A = \begin{bmatrix} .2 & .4 & .3 \\ .4 & .2 & .3 \\ .4 & .4 & .4 \end{bmatrix}$.

**(1)** Show that $0$ is an eigenvalue of $A$. Find all eigenvalues of $A$.

**(2)** If $u_0 = (0, 10, 0)$, find the limit of $A^k u_0$ as $k \rightarrow \infty$.

#### Sol)

**(1)**

$A$의 첫 두 columns의 선형 결합으로 마지막 column을 만들 수 있다. 즉, $A$가 singular 하므로, $0$을 고윳값으로 가진다.

$A$는 Markov matrix 이므로, $1$을 고윳값으로 가진다.

고윳값의 합인 $\text{tr}(A) = .2 + .2 + .4 = 0.8$을 통해, 마지막으로 남은 고윳값은 $-0.2$임을 알 수 있다.

**(2) - 철학이 필요한 풀이**

하나의 $1$을 제외한 두 고윳값의 절댓값이 모두 $1$보다 작으므로, $A^k$는 $\lambda = 1$의 고유벡터의 방향으로 수렴한다.

이 고유벡터로는 $c (3, 3, 4)$가 있는데, Markov matrix 이므로 각 항의 합이 보존된다. $c (3 + 3 + 4) = 0 + 10 + 0 = 10$이므로, $c = 1$.

즉, $A^k u_0$는 $(3, 3, 4)$로 수렴한다.

**(2) - 손이 바쁜 풀이**

$A$를 대각화하면, $A^k = P D^k P^\mathsf{T}$ 꼴로 표현할 수 있다. $\displaystyle D^k \rightarrow \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}$가 되므로, 수렴값을 계산하기 어렵지 않을 것이다.

고유벡터를 전부 찾아줘야 하는데 조금 귀찮다. $\lambda = 0$과 $\lambda = 1$의 고유벡터를 찾고, 둘을 외적하면 $\lambda = -0.2$의 고유벡터를 공짜로 얻을 수 있다.



### Problem 5.

Suppose that $A^2 = A$.

**(1)** Show that an eigenvalue of $A$ must be either $0$ or $1$.

**(2)** Show that $A$ is diagonalizable.

#### Sol)

**(1)**

$$
Ax = \lambda x, \ x \ne \mathbf{0}
\quad \Longrightarrow \quad
\lambda x = A x = A^2 x = \lambda A x = \lambda^2 x
\quad \Longrightarrow \quad
\lambda = \lambda^2
\quad \Longrightarrow \quad
\lambda \in \{ 0, 1 \}
$$

**(2) - 모범 답안**

$A^2 = A$ 이므로, $A$의 minimal polynomial은 $x$, $x-1$, $x(x-1)$ 중 하나다. 각 factor의 degree가 $1$ 이므로, Primary decomposition theorem에 의해 대각화 가능하다.

문제는, 최소 다항식이랑 PDT를 안 배웠다. 최강의 정리로 오버킬링하는 풀이다.

**(2) - 내 풀이**

$A$의 Jordan normal form $AM = MJ$를 생각하자. $A^2 = M J^2 M^{-1}$이므로, $J = J^2$고, 각 Jordan block에 대해 $J_i = J_i^2$라야 한다.

$\lambda \in \\{ 0, 1 \\}$임을 고려하면, Jordan block $J_i$의 크기가 $2 \times 2$ 이상이면 모순이 생긴다. 즉, 모든 Jordan block의 크기는 $1 \times 1$.

이는, $J$가 대각 행렬이라는 뜻이고, Jordan normal form이 우리가 찾던 $A$의 대각화 식이다.

**(2) - 가장 아름다운 풀이**

수업 때 배운 모든 지식에 대한 철학이 필요하다.

고윳값 $0$과 $1$에 대응하는 고유벡터의 벡터 공간을 $V_0$, $V_1$라고 하자.

* $A^2 = A$ 이므로, $C(A) \subseteq V_1$.
* $V_0 = N(A)$.
* $C(A) \cap N(A) \subseteq V_1 \cap V_0 = \\{ \mathbf{0} \\}$.
* Rank-nullity theorem에 의해, $C(A) \bigoplus N(A) = \mathbb{R}^n$.
* 정리하면, $V_0 \bigoplus V_1 = \mathbb{R}^n$. 고로, 대각화 가능하다.

완전하게 푼 학생이 몇 안 된다. 유명한 문제니깐 한 번씩은 꼭 도전해볼 것.
