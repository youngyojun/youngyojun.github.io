---
title: "ICPC WF 연습 (2/6)"
date: 2021-02-09 20:27:12
categories:
 - ICPC
 - Practice
tags:
 - ICPC
 - 연습


---

### [Chess Puzzle](https://www.acmicpc.net/problem/5239)

2분 30초 AC.

전성기 때 나라면 1분 안에 풀었을 텐데... 열심히 해야지.



### [Squared Word](https://www.acmicpc.net/problem/8300)

길이 $N$의 문자열 $S$가 주어진다. 제곱 문자열 $L^2$가 $S$에 포함될 때, 문자열 $L$의 최대 길이를 구하는 문제이다.

$L^2$가 $S$에 포함된다는 것은, 어떤 $1 \le i < N$가 존재하여, $S[1 \cdots i]$와 $S[i+1 \cdots N]$ 모두에 각각 $L$가 포함됨과 동치이다.

따라서, 모든 $i$에 대하여, $S[1 \cdots i]$와 $S[i+1 \cdots N]$의 LCS를 구한 후, 이 값의 최댓값이 문제의 답이 된다.

나는 $O(N)$번 LCS를 계산하는 과정을 $O\left( N^2 \right)$로 최적화하려고 고민을 아주 많이 했었다... tlwpdus도 이렇게 풀었고...

그런데, bitset을 이용하면, LCS를 $O\left( \frac{ N^2 }{32} \right)$에 해결할 수 있다고 한다. Naive 알고리즘이 $O\left( \frac{N^3}{32} \right)$인데 $O\left( N^2 \right)$ tlwpdus 풀이랑 시간이 똑같다. 상당히 큰 충격.



### [응급센터](https://www.acmicpc.net/problem/2489)

대충 뚝딱뚝딱 선형에 풀리는 것 같은데 증명을 못 하겠다.



### [Cliquers Strike Back](https://www.acmicpc.net/problem/8357)

두 자연수 $N$, $M$가 주어진다. Labeling이 되어 있는 $N$개의 정점을 몇 개의 그룹으로 나누는 경우의 수를 '지수'로 가지고, 밑이 $M$인 수를 $P := 10^9 - 401$로 나눈 나머지를 구하는 문제이다.

이 문제는 옛날 폴란드 문제이다. 풀이를 만들고 어떻게든 끼워넣어서 문제를 만들었겠구나 생각하면서 문제를 풀었다.

먼저, $P$는 소수이다. $N$-Labeling 경우의 수가 $D_N$라고 하자. $M^{D_N} \mod P$를 구해야 한다.