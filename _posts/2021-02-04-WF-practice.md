---
title: "ICPC WF 연습 (2/3)"
date: 2021-02-04 01:20:27
categories:
 - ICPC
 - Practice
tags:
 - ICPC
 - 연습

---

### [장난감 경주](https://www.acmicpc.net/problem/19592)

부등식을 가지고 노는 문제이다.

브론즈 문제인데 10분 넘게 걸렸다. 왜인지는 잘 모르겠다... 13분 AC.



### [The Shortest Period](https://www.acmicpc.net/problem/8285)

길이 $N$인 문자열 $S$에서 하나의 문자를 지웠을 때 얻어지는 문자열의 주기의 최솟값을 구하는 문제이다.

문자열 $S[1 \cdots N]$의 주기가 $d$라는 것은, $S[1 \cdots N-d] = S[d+1 \cdots N]$과 동치이다.

이제, 원래 문제로 돌아가서, $S$에서 하나의 문자를 지워서, 길이 $L$의 Prefix와 Suffix가 서로 같도록 만들 수 있는지 판별해보자. 다음 네 가지 경우를 고려하면 된다: ($x$번째 문자를 지운다고 하자.)

1. $S[1 \cdots L] = S[N-L+1 \cdot N]$ $(L < x < N-L+1)$
2. $S[1 \cdots L] = S[N-L \cdots N]$ $(\max(L+1, N-L) \le x \le N)$
3. $S[1 \cdots L+1] = S[N-L+1 \cdots N]$ $(1 \le x \le \min(L+1, N-L))$
4. $S[1 \cdots L+1] = S[N-L \cdots N]$ $(N-L \le x \le L+1)$

먼저, 부분문자열의 동일 여부 판별은 Hashing을 이용하자. $O(N^2)$번의 비교가 이루어지므로, $10^9$-scale의 소수 두 개를 이용해야 안전하다.

Case 1은 아주 쉽다. Case 2, 3도 적당한 이분 탐색으로 $x$를 찾을 수 있다.

Case 4가 이 문제에서 가장 어려운 부분이다. Case 2, 3과 동일한 아이디어를 이용하면, $x$로 가능한 Indices의 범위가 나온다. 이제, 적당히 문제를 변형하면, 다음과 같이 문제가 환원된다:

> $N$개의 공이 일렬로 배열되어 있다. 각 공의 색은 빨강 혹은 파랑이다. 함수 $f$를 적절히 호출하여, 연속한 $K$개의 빨간 공이 존재하는지 판별하시오.
>
> 함수 $f(s, e)$는 $s$번째 공부터 $e$번째 공까지 모두 빨간 공인지 여부를 반환한다.

이 문제는 함수 $f$를 $O\left( \frac{N}{K} \lg K \right)$번만 호출해서 해결할 수 있다. $N$개의 공을 $K$개씩 끊어 $O\left( \frac{N}{K} \right)$개의 버킷을 만든 후, 각 버킷에 대해 "왼쪽부터 연속한 빨간 공의 개수"와 "오른쪽부터 연속한 빨간 공의 개수"를 이분 탐색으로 세어주면 된다.

환원된 문제의 아이디어를 잘 적용하면, Case 4를 $O\left( \frac{N}{L} \lg L \right)$에 처리할 수 있다.

따라서, 전체 문제를 $O\left( \sum_{L} \frac{N}{L} \lg L \right) = O\left( N \lg^2 N \right)$에 해결할 수 있다. 2시간 AC.

dotorya는 Suffix Array를 이용해서 풀었다. 어떻게...?



### [Termites](https://www.acmicpc.net/problem/8305)

$N$개의 수 $A_1 \cdots A_N$가 있다. 두 명이 서로 번갈아가면서, $0$과 이웃한 수 $A_i \ne 0$를 골라, 자신의 점수에 더한 후, $A_i$의 값을 $0$으로 바꾼다. 각자 최선을 다할 때, 최종 점수를 구하는 문제이다.

여러 생각을 해봤는데, $O(N^2)$에도 못 풀겠다. 대충 찾아보니, [논문](https://www.mimuw.edu.pl/~idziaszek/termity/termity.pdf)이 나온다.

세상에... 논문에서 "Fusion Principle" 이름만 보자마자 풀이를 알아버렸다. 알고 있는 테그닉인데 떠올리지 못한 점이 아쉽다.

$N$개의 수가 있고, 서로 번갈아가면서 좌우의 수를 하나씩 뽑는 (단순한 버전의) 문제를 생각하자. 인접한 세 수 $a$, $b$, $c$에 대하여, $b = \max (a, b, c)$라면, 이 세 수를 하나의 수 $a + c - b$로 합칠 수 있다. 만일, 상대방이 $a$를 가져간다면, 나는 즉시 $b$를 가져가고, 상대방은 남은 $c$까지 가져가는 전략이 항상 최적이기 때문이다.

이러한 Reduction을 계속 진행하면, 남은 수는 정렬되어있다. 이제, 가장 큰 수부터 차례대로 나누어 가지면, 그것이 답이 된다.

원 문제에서는 한 쪽 끝이 막혀있을 수 있는데, 비슷하게 적당히 처리하면 된다. 전체 시간 복잡도는 $O(N \lg N)$.



### [Termites 2](https://www.acmicpc.net/problem/8319)

트리에서 논다...



### [Tighten Up!](https://www.acmicpc.net/problem/4967)

이차원 평면에 $N$개의 못이 박혀 있고, $N$-lines chain 형태의 실이 있다. 실의 양쪽 끝을 평면에 수직한 방향으로 잡아당겨, 실이 못에 적당히 걸쳐 팽팽해지도록 한다. 이때, 실의 길이를 구하는 문제이다.

재미있는 기하 문제이다. 실의 상태를 못에 대한 상대적인 위치를 이용하여 나타내면 해결할 수 있다.

