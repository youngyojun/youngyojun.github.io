---
title: "ICPC WF 연습 (3/4)"
date: 2021-03-05 15:19:21
categories:
 - ICPC
 - Practice
tags:
 - ICPC
 - 연습

---

### [Circle](https://www.acmicpc.net/problem/7115)

격자판에 원을 그렸을 때, 원이 지나는 격자의 개수를 세는 문제이다.

효율적으로 잘 세면 된다.

이게 왜 브론즈 1 문제인지 전혀 모르겠다.



### [Balance](https://www.acmicpc.net/problem/19043)

$N \times N$ 행렬 $B_{i, j}$가 다음 조건을 만족하면, Balanced라고 하자:

* 모든 $i$, $j$에 대하여, $B _{i-1, j-1} + B _{i, j} = B _{i-1, j} + B _{i, j-1}$

$N \times N$ 행렬 $A_{i, j}$가 주어질 때, 각 원소가 $A _{i, j}$ 이상이면서 Balanced한 행렬 중, 원소의 합이 최소인 행렬을 구하는 문제이다.



위의 식을 다음과 같이 변형하자: $B _{i-1, j} - B _{i-1, j-1} = B _{i, j} - B _{i, j-1}$

따라서, Balanced한 행렬은 항상 다음과 같이 생성할 수 있다:

* 두 수열 $C$, $D$에 대하여, $B _{i, j} = C _i + D _j$

즉, $A _{i, j} \le C _i + D _j$의 부등식을 모두 만족하면서, $\sum _i C _i + \sum _j D _j$가 최소가 되는 두 수열 $C$, $D$를 구하면 된다.

따라서, LP 문제를 풀면 되고, Simplex Algorithm을 적용하면 된다.



나는, Simplex Algorithm을 적용할 때, 행렬의 계수가 음이 아닌 수만 되는 줄 알고 있어서 오래 걸렸다. 사실은 음수도 가능하다.



### [Entanglement](https://www.acmicpc.net/problem/19044)

모르겠다.

답이 0인지 아닌지 판별하는 것도 2-SAT을 열심히 풀어야 가능하다.

가짓수를 어떻게 셀까...?



### [Origami](https://www.acmicpc.net/problem/19049)

각 격자에 알파벳이 적혀 있는 $N \times M$ 격자판 모양의 색종이가 있다.

만일, 어떤 격자선을 기준으로 색종이를 (넓은 부분 위에 좁은 부분이 오도록) 접었을 때, 포개어지는 부분이 서로 일치한다면, 그 격자선을 따라 접을 수 있다.

색종이를 마구 접었을 때, 최종 상태로 가능한 경우의 수를 구하는 문제이다.



먼저, 가로축과 세로축을 접는 것은 서로 독립이다. 따라서, 문제를 1차원으로 변형할 수 있다.

1차원 색종이를 접었을 때, 최종 상태로 가능한 구간의 수를 구하여야 한다. 나는 엄밀하게 증명하지 않았지만, $a$가 구간의 왼쪽 끝으로 가능하고, $b$가 구간의 오른쪽 끝으로 가능하다면, 구간 $[a, b]$는 항상 최종 상태로 가능하다.

따라서, Manacher Algorithm을 이용하여, 각 축을 언제부터 접을 수 있는지 구해놓았다면, 구간의 왼쪽 끝과 오른쪽 끝의 후보 지점을 모두 계산할 수 있다.

전체 시간 복잡도는 $O(NM)$이다.



### [Xormites](https://www.acmicpc.net/problem/19054)

$N$개의 수 $A _1, \cdots, A _N$가 일렬로 놓여져 있다. 두 사람이 번갈아가며, 양 끝에 놓여진 수 중 하나를 골라 가져간다. 가져간 수의 xor가 큰 사람이 이길 때, 승자를 판별하는 문제이다.

먼저, $A _1 \oplus A _2 \oplus \cdots \oplus A _N$의 값을 계산하자. 이 값이 0이라면, 두 사람은 항상 비긴다.

이 값이 0이 아니라면, 가장 큰 bit $X$를 생각하자. 수열 $A$에서 게임은, $A' _i := A _i \land X$인 수열 $A'$에서 하는 게임과 동치이다. 따라서, 01-string으로 문제를 환원할 수 있다.

먼저, $N$가 짝수라면, 선수가 승리한다. 왜냐하면, 선수는 "모든 짝수번째 수를 가져가거나", "모든 홀수번째 수를 가져가는" 전략을 선택할 수 있기 때문이다.

이제, $N$가 홀수라고 하자. 처음에 선수는 절대로 0을 가져가면 안 된다.

선수가 어떤 1을 가져갔다고 하자. 이제부터, 선수는 항상, 방금 전 후수가 가져간 수와 동일한 수를 가져가야 한다. 만일, 이를 실패한다면, 남은 수의 개수가 짝수이고, 남은 수의 xor sum가 1이기 때문에, 후수가 승리하는 전략이 존재하게 된다.

선수가 후수의 전략을 Defence할 수 있는 수열은, 항상 다음과 같은 형태를 가진다: $S aa bb cc dd \cdots \overline{S}$

여기서, $\overline{S}$는 문자열 $S$를 뒤집은 것이다. Exchange Argument를 이용해서 증명하고 싶었는데 실패했다. Naive하게 전탐색을 했는데 반례가 없어서 믿고 풀었다.

전체 시간 복잡도는 $O(N)$이다.