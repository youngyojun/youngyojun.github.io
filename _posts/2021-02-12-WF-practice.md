---
title: "ICPC WF 연습 (2/11)"
date: 2021-02-12 00:00:00
categories:
 - ICPC
 - Practice
tags:
 - ICPC
 - 연습


---

### [Hard Refactoring](https://www.acmicpc.net/problem/13996)

부등식 여러 개가 주어지면, 이를 동치이면서 최대한 짧은 하나의 부등식으로 표현하는 문제이다.

그냥 열심히 짜면 된다.



### [Bin](https://www.acmicpc.net/problem/18743)

각 정점에 대해 왼쪽 부트리의 크기가 오른쪽 부트리의 크기 + $K$ 이하인, $N$개의 잎을 가진 Full binary tree의 개수를 세는 문제이다.

$N = n$일 때의 답을 $D_n$이라고 하자. 자명하게, $D_0 = D_1 = 1$이다.

다음과 같은 점화식은 쉽게 관찰할 수 있다: $D_n = \sum_{l = 1}^{ \lfloor { (n+K) / 2 } \rfloor } D _l D _{n - l}$

$K$가 아주 작으므로, 식을 다음과 같이 변형할 수 있다: $D_n = \frac{1}{2} \sum_{l = 1}^{ n } D _l D _{n - l} + O(K)\text{개의 항}$

이제, Online FFT Technique을 적용하면, $O\left( NK \lg N \right)$에 해결할 수 있다.



### [Cat](https://www.acmicpc.net/problem/18744)

두 문자열 $A$, $B$가 주어질 때, $A[a \cdots ] + B[ \cdots b]$ 꼴의 서로 다른 문자열의 개수를 세는 문제이다.

SA를 이용하면 풀린다고 한다. 나는 모르겠다.



### [Exp](https://www.acmicpc.net/problem/18746)

$K+1$개의 음이 아닌 실수 $P_0, P_1, \cdots, P_K$가 주어질 때, 다항식 $\left( P_0 + P_1 x + P_2 x^2 + \cdots + P_K x^K \right)^N$에서, $x^0, x^1, \cdots, x^{T-1}$의 계수를 모두 구하는 문제이다.

구해야 하는 다항식을 $P(x)$라고 하자. 또한, $P^N = c_0 x^0 + c_1 x^1 + \cdots + c_T x^T + \cdots $라고 하자.

$N P^N P' = \left( P^N \right)' P$이므로, 계수 비교를 하면, $c_i$를 $c _{i-K-1}, \cdots, c _{i-1}$의 선형 결합으로 표현할 수 있다.

따라서, 전체 시간 복잡도는 $O\left( TK \right)$이다.



### [Grp](https://www.acmicpc.net/problem/18748)

$N$개의 알파벳 중 $K$개 이하의 알파벳을 뽑아 만들 수 있는 모든 집합을, 다음 조건을 만족하도록 최소 개수의 그룹으로 나누어야 한다:

* 각 집합은 정확하게 하나의 그룹에만 속한다.
* 하나의 그룹에 속하는 모든 집합은 서로소이다.
* 하나의 그룹에 속하는 모든 집합의 크기의 합은 $K$ 이하이다.

$K$가 홀수일 때를 풀어보자. 답의 자명한 상한을 생각하자. 크기가 $K/2$ 초과인 집합은 같은 그룹에 속할 수 없다. 따라서, 답은 $\binom{N}{(K+1)/2} + \cdots + \binom{N}{K}$보다 작을 수 없다.

이제, 제시한 상한을 답으로 가지는 해를 만들자. $1 \le x < K/2$이면 $\binom{N}{x} \le \binom{N}{K-x}$이므로, 크기가 $x$인 집합과 $K-x$인 집합 사이에 Matching을 구하면 된다.

이제, $K$가 짝수일 때를 관찰하자. 크기가 $K/2$인 집합을 두 개씩 묶어 최대한 많은 그룹을 만들어야 한다. 이는 General Matching을 구하면 해결할 수 있다. 놀랍게도, $N \le 17$이면, 항상 Perfect Matching이 존재해서, 이 논리는 유효하다.

이를 잘 구현하면, 모든 입력에 대해 상당히 빠른 시간 안에 답이 잘 나온다.