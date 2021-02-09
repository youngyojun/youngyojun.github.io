---
title: "ICPC WF 연습 (2/8)"
date: 2021-02-09 21:11:24
categories:
 - ICPC
 - Practice
tags:
 - ICPC
 - 연습
---

### [Pizza](https://www.acmicpc.net/problem/20660)

Boolean array 가지고 노는 문제. 나는 bitset의 & operator로 풀어보았다.

2분 AC.



### [3D Histogram](https://www.acmicpc.net/problem/20197)

크기가 $1 \times A_i \times B_i$인 블록 $N$개로 이루어진 3차원 히스토그램이 주어진다. 이 히스토그램에 포함되는, 부피가 가장 큰 직육면체의 부피를 계산하는 문제이다.

2차원 히스토그램에서 최대 넓이 직사각형을 선형에 푸는 아이디어를 적용해보았다. 하지만, 잘 안 되는 듯 하다.

분할 정복 기법을 적용하자. 기준면에서 보이는 단면의 형태를 계산하자. 이는 (깊이, 높이, 너비) 형태로 나올 것이다.

이제, '깊이'를 index, (높이, 너비)의 point를 key로 생각하자. index가 증가함에 따라, (높이, 너비)의 point는 "증가하는" 형태이며, 또한, 높이와 너비의 곱 또한 증가함을 관찰하자.

기준면 오른쪽의 블록 하나를 잡자. 부피를 최대로 만드는 기준면 왼쪽의 블록을 찾아야 한다. (높이, 너비) point를 좌표평면에 찍어놓고 관찰하면, index가 어떤 구간에 속하는 점에 대해, Convex hull trick 형태의 문제를 해결해야 함을 알 수 있다.

Convex hull trick의 deque를 Segment tree 형태로 구축하면, 문제를 효율적으로 해결할 수 있을 것 같다.

구현을 아주 잘 하면, 분할 정복에서 소요되는 시간은 $O\left( N \lg N \right)$이다. 따라서, 전체 문제를 $O\left( N \lg^2 N \right)$에 해결할 수 있다. 3시간 AC.



### [Tenis](https://www.acmicpc.net/problem/20199)

코트가 두 개일 때를 풀어보았다. 세 개일 때에는 정말 역겨울 거라고 예상하고 안 풀었다.



### [Euklid](https://www.acmicpc.net/problem/20202)

두 자연수 $g$, $h$가 주어질 때, $\gcd (a, b) = g$, $R(a, b) = h$인 자연수쌍 $(a, b)$를 아무거나 하나 찾는 문제이다.

문제에서 주어진 함수 $R$을 해석해야 한다. $R(a, b)$는 $a$를 $b$진법으로 썼을 때에 가장 큰 자릿수가 $a'$라면, $R(a, b) = R(b, a')$로 Reduct되는 함수이다.

나의 접근은 다음과 같다. $h = R(h, 1)$이다. 이제, $R(h, 1) = R(gk, h)$인 $k$를 찾을 것이다.

$g \le h^n$을 만족하는 최소 $n$을 찾자. 비둘기집 원리에 의하여, $h$진법으로 $n+1$자리 수이면서, 가장 큰 자릿수가 1이고, 또한 $g$의 배수인 수가 항상 존재한다. 이 수를 $gk$라고 두면 된다.

$h = R(gk, h)$까지 왔다. $R(gk, h) = R(x, gk)$임과 동시에 $\gcd (x, gk) = g$인 $x$를 찾아야 한다.

먼저, $k = 1$라면, $R(g, h) = R(gh, g)$이며, $\gcd (gh, g) = g$다. 따라서, $x = gh$.

$k > 1$라면, $R(gk, h) = R(ghk + g, gk)$이며, $\gcd (ghk + g, gk) = g$다. 따라서, $x = ghk + g$.

따라서, $O(1)$에 문제를 해결할 수 있다. 46분 AC.



### [(False) faces](https://www.acmicpc.net/problem/7875)

$N \times N$ Binary matrix $M$가 주어질 때, $M$의 permanent $\text{perm } M$가 4의 배수인지 판별하는 문제이다.

먼저, Determinant $\det M$과 다르게, $\text{perm } M$을 Polynomial time에 계산하는 것은 P = NP보다 더 어려운 문제임이 알려져 있다. 따라서, 조금은 tricky하게 문제를 접근해야 한다.

$-1 \equiv 1 \mod 2$이므로, $\det M \equiv \text{perm } M \mod 2$이다. 따라서, $\det M \equiv 0 \mod 2$라고 가정해도 좋다.

선형 대수학의 기본 원리에 따르면, $\mathbb{Z}_2^N$에서 $M\mathbf{v} = 0$인 비자명한 해 $\mathbf{v}$가 존재한다. 이러한 벡터를 구하자.

$\mathbf{w} := \sum_{i} v_i \mathbf{m}_i$라고 하자. $\mathbf{w}$의 모든 성분은 짝수이다. 편의상, $\mathbf{w}/2 := \frac{1}{2} \mathbf{w}$라고 하자.

$\text{perm } \left( \mathbf{w}, \mathbf{m}_2, \mathbf{m}_3, \cdots, \mathbf{m}_N \right) = \sum_{i} v_i \text{perm } \left( \mathbf{m}_i, \mathbf{m}_2, \mathbf{m}_3, \cdots, \mathbf{m}_N \right)$이다. $v_1 = 1$라면, 이러한 식을 이용하여, $\text{perm } M = \text{perm } \left( \mathbf{m}_1, \mathbf{m}_2, \cdots, \mathbf{m}_N \right)$의 값을 알아낼 수 있을 것이다. $\mathbf{v}$가 Non-zero이므로, $v_i = 1$인 $i$가 하나 이상 존재하기에, 이러한 논리는 유효하다.

이제, 재미있는 관찰을 하자. $\text{perm } \left( \mathbf{w}, \mathbf{m}_2, \mathbf{m}_3, \cdots, \mathbf{m}_N \right) = 2 \text{perm } \left( \mathbf{w}/2, \mathbf{m}_2, \mathbf{m}_3, \cdots, \mathbf{m}_N \right)$이다. 따라서, $\det \left( \mathbf{w}/2, \mathbf{m}_2, \mathbf{m}_3, \cdots, \mathbf{m}_N \right) \mod 2$를 계산하면 충분하다.

비슷하게, $\text{perm } \left( \mathbf{m}_i, \mathbf{m}_2, \mathbf{m}_3, \cdots, \mathbf{m}_N \right)$도, 벡터 $\mathbf{m}_i$가 두 번 들어가 있는 형태이므로, 짝수이다. 따라서, Determinant로 치환해서 계산할 수 있다.

이대로 구현하면, Determinant를 $O\left( N^2 \right)$번 계산해야 한다. 하지만, 창의성을 발휘하면, Determinant를 $O(N)$번만 계산해서 잘 처리할 수 있다.

나는 Gaussian elimination을 총 $N-1$번 수행한다. 전체 시간복잡도는 $O\left( \frac{N^3}{32} \right)$이다. BOJ는 TL가 1초로 아주 빡빡하게 설정되어 있어, TL 연장 요청을 넣었다.