---
title: "ICPC WF 연습 (3/7)"
date: 2021-03-08 14:54:35
categories:
 - ICPC
 - Practice
tags:
 - ICPC
 - 연습


---

$\newcommand{\abs}[1]{\left\lvert #1 \rvert\right}$

### [Flip Flow](https://www.acmicpc.net/problem/20906)

모래시계를 시뮬레이션 하는 문제이다.

시키는 대로 구현하면 된다.



### [Ascent Sequences](https://www.acmicpc.net/problem/19401)

다음 조건을 모두 만족하는 길이 $N$의 수열 $\{ a_i \}$의 가짓수를 구하는 문제이다:

* 모든 원소는 음이 아닌 정수이다.
* $a_i \le A_{i-1} + 1$. 여기서, $A_i$는 $a_1 \cdots a_i$에서 증가한 횟수.
* "201 패턴"이 존재하면 안된다.



대충 다음과 같은 생각을 하였다:

* 문제에서 찾고자 하는 수열은 다음 두 수열을 적당히 합쳤다고 생각해도 된다:
  * $a_i$는 $\max \left( a_1, a_2, \cdots, a_{i-1} \right)$ 혹은 이보다 하나 작은 값.
  * 계단 형태로 감소하는 수열
* 각 수열 모두 적당한 DP로 해결할 수 있다. 나는 $O\left( N^4 \right)$ 크기의 DP를 생각하였다.
* 이제 적당히 합쳐서 가짓수를 세면 된다.



하지만, 결국 풀지 못했다. 더 많은 관찰이 필요한 듯 하다.



### [Buggy Combination Lock](https://www.acmicpc.net/problem/19402)

두 개의 수열 $\{ a_i \}$, $\{ b_i \}$가 있다. 다음과 같은 연산을 사용하여, 수열 $\{ a_i \}$를 $\{ b_i \}$로 바꿀 때, 연산 사용의 최소 횟수를 구하는 문제이다.

* $a_i$과 $a_{i+1}$에 모두 $1$을 더하거나, $-1$을 더한다.
  * Index는 modulo $N$, 원소의 값은 modulo $M$에서 생각한다.



Index $i$에 대하여 적용한 값을 $v_i$라고 하자. $-M < v_i < M$이며, $b_i = a_i + v_i + v_{i-1}$를 만족하면서 $\sum_i \left | \min \left( v_i, M - v_i \right) \right |$가 최소가 되는 $\{ v_i \}$를 찾으면 된다.

식을 조금 변형하면, $v_{i-1} + v_i = b_i - a_i =: c_i$를 얻을 수 있다. 즉, $v_i = A_i v_0 + B_i$ 형태로 나타낼 수 있으며, 또한 $A_i = \pm 1$가 성립한다.

이제, Case를 나누자:

* $A_0 = 1$인 경우,
  * $B_0 \ne 0$이라면, 해가 존재하지 않는다.
  * $B_0 = 0$이라면, 모든 $v_0$에 대해 해가 존재한다. (즉, 해가 총 $M$개 존재한다.)
    * $f\left( v_0 \right) := \sum_i \left | \min( v_i, M - v_i \right) \right |$라고 하자.
    * 함수 $f$는 $N$개의 Piecewise-linear function의 합으로 표현할 수 있다.
    * 따라서, $f$의 모든 local minima와 maxima를 전부 알아낼 수 있다.
    * 즉, $\min f$를 $O \left( N \lg N \right)$에 구할 수 있다.
* $A_0 = -1$인 경우,
  * $v_0 = -v_0 + B_0$, $2 v_0 = B_0$이므로, 가능한 $v_0$의 값은 최대 두 개이다.
  * 가능한 모든 $v_0$에 대해, $\sum_i \abs{ \min \left( v_i, M - v_i \right) }$의 값을 계산하면 충분하다.



따라서, $O\left( N \lg N \right)$의 시간 복잡도로 답을 계산할 수 있다.

틀리기 쉬운 요소가 상당히 많았고, 나는 그런 부분에 대해 모두 한 번씩 틀렸었다.



### [Cyclic Shifts](https://www.acmicpc.net/problem/19403)

문자열 $S= s_1 s_2 \cdots s_k$에 대해, 문자열 $s_{i+1} \cdots s_k s_1 \cdots s_i$가 사전순으로 최소가 되는 $i$ 중, 가장 작은 $i$를 Cyclic shift라고 정의하자. 길이 $N$의 문자열 $S$가 주어질 때, 모든 Prefix에 대하여 Cyclic shift의 값을 구하는 문제이다.

찾아보니 논문이다. 길이 $1, 2, \cdots, K$인 Prefix의 Cyclic shift 값을 모두 알고 있을 때, 단 세 번의 추가 비교 연산만으로 $K+1$-Prefix의 Cyclic shift 값을 알아낼 수 있다고 한다.



### [Exclusive Training](https://www.acmicpc.net/problem/19405)

$N$개의 벡터 $\left( r_i, p_i, a_i, b_i \right)$가 주어진다. 각 $i$에 대하여, 다음 최댓값을 구하는 문제이다:

* $r \le r_i$, $a_i \le d \le b_i$인 $(r, d)$를 고정하자.
* $r_j \le r$, $a_j \le d \le b_j$를 모두 만족하는 모든 $j \ne i$에 대하여, $\sum_j p_j$의 최댓값.



먼저, $r_i$가 서로 다르므로, $r_i$의 오름차순으로 정렬하자.

Key가 $d$인 Segment Tree를 생각하자. 이 Segment Tree는 다음 연산을 지원한다:

* 구간에 $p_i$ 더하기.
* 각 $d$에 대하여, 지금까지 자신이 가졌던 값의 최댓값을 $mx(d)$라고 하자. 구간에서 $mx(d)$의 최댓값 구하기.



$r_i$가 작은 $i$부터 차례대로 보면서, 구간 $\left[ a_i, b_i \right]$에서 최댓값이 문제의 답이 된다. 문제의 답을 구한 후, 구간 $\left[ a_i, b_i \right]$에 $p_i$를 더해주면 된다.

Segment Tree의 이러한 연산은 Lazy Propagation Technique를 이용하면 효율적으로 처리할 수 있다. Propagation 정보로

* 구간에 더해주어야 하는 값
* 이 구간에 더해주어야 하는 값의 Prefix sum의 최댓값 ($mx(d)$에 더해주어야 하는 값)

을 들고 있어야 한다.

전체 시간 복잡도는 $O \left( N \lg N \right)$, 공간 복잡도는 $O \left( N \right)$이다.



상당히 재미있는 테크닉이다.