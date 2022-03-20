---
title: "asdf"
date: 2022-03-20 14:55:28 +0900
categories:
 - Secmem
tags:
 - Algorithm

---


# 개요

두 문자열의 가장 긴 공통 부분문자열을 찾는 Longest Common Subsequence (LCS) 문제는 정보과학에서 기초가 되는 잘 알려진 문제이다. 이렇게 기초적임에도 불구하고, LCS 문제는 생물정보학이나 전산언어학, 그리고 실생활에서 자주 사용하는 검색 엔진 등 다양한 학문과 분야에서 활용되는 아주 중요한 문제이다.

길이가 각각 $L_1, \cdots, L_N$인 문자열 $N$개의 LCS는 다이나믹 프로그래밍 기법을 이용하여 $\displaystyle \mathcal{O} \left( N \prod _{k=1}^{N} L _k \right) $의 시간 복잡도로 해결할 수 있음이 잘 알려져 있다.

본 글은 길이 $N$, $M$ $(N \gg M)$의 두 문자열의 LCS를 평균 $\displaystyle \mathcal{O} \left( N \lg N \right)$에 해결하는 효율적인 알고리즘을 소개하고 그 응용 방안에 대하여 알아본다.



# 문제 제기

## 가장 긴 공통 부분문자열 문제

어떤 문자열 $S$의 부분문자열 (Subsequence)의 정의는 다음과 같다.

> 문자열 $S = s _1 s _2 \cdots s _N$의 부분문자열 $s _{i _1} s _{i _2} \cdots s _{i _K}$은 정수열 $\left\\{ i _k \right\\} _{k = 1}^{k = K}$로 생성되는 문자열이다. 여기서 수열 $\left\\{ i _k \right\\} _{k = 1}^{k = K}$는 다음 조건을 만족해야 한다.
>
> * $0 \le K \le N$
> * $\displaystyle 1 \le i _1 < i _2 < \cdots < i _K \le N$

즉, 부분문자열은 원 문자열에서 순서를 유지한 채 몇 개의 문자를 제거하여 얻어질 수 있는 문자열을 뜻한다.



가장 긴 공통 부분문자열 (LCS) 문제란, $K$개의 문자열이 주어질 때, 모든 문자열의 공통 부분문자열 중에서 최장인 것을 찾는 문제이다. 이러한 문제는 특히 생물정보학에서 자주 사용되며, 단백질의 아미노산 서열이나, DNA, RNA의 염기 서열의 LCS를 계산하여 얼마나 그 구조가 유사한지를 분석하는 데에 응용될 수 있다.

1978년에 David Maier는 문자열의 개수 $K$를 변수로 두면, [LCS 문제는 NP-Hard가 됨을 증명](https://dl.acm.org/doi/10.1145/322063.322075)하였다. 본 글에서는 $\displaystyle K = \mathcal{O} \left( 1 \right) $, 특히 $K = 2$로 가정한다.



## 고전적인 DP 알고리즘

LCS 문제는 다이나믹 프로그래밍 기법을 이용하여 쉽게 해결할 수 있다.



먼저, 두 문자열 $X$, $Y$에 대하여, $\text{LCS} (X, Y)$를 "$X$와 $Y$의 최장 공통 부분문자열의 집합"으로 정의하자.

#### Lemma 1. 공통 접미사는 LCS에 포함된다.

> 임의의 문자열 $X$, $Y$, $S$에 대하여, 다음이 성립한다.
>
> $$ \text{LCS} \left( X + S, Y + S \right) = \text{LCS} \left( X, Y \right) + S := \left\\{ C + S : C \in \text{LCS} \left( X, Y \right) \right\\} $$

이는 $|S| = 1$일 때에만 증명해도 충분하다. $X + S$와 $Y + S$의 마지막 문자는 서로에게 대응시키는 것이 LCS를 구함에 있어 손해가 되지 않기 때문에 항상 최적임을 알 수 있다.

#### Lemma 2. 양자택일.

> 임의의 문자열 $X$, $Y$와 서로 다른 두 알파벳 $\alpha, \beta \in \Sigma$에 대하여, 다음이 성립한다.
>
> $$ \text{LCS} \left( X + \alpha, Y + \beta \right) = \max \left[ \text{LCS} \left( X + \alpha, Y \right), \text{LCS} \left( X, Y + \beta \right) \right] $$
>
> 여기서, $ \max \left[ U, V \right] $는 $U \cup V$에서 길이가 가장 긴 문자열만 모아놓은 문자열 집합을 의미한다.

$\alpha \ne \beta$이므로, 두 알파벳은 서로에게 대응될 수 없다. 즉, 둘 중 하나는 공통 부분문자열에 포함되지 못하므로, 각각의 경우에 대하여 LCS를 계산한 후 합쳐줄 수 있다. $\alpha = \beta$인 경우는 **Lemma 1.**에 해당함에 유의하라.



우리는 이 두 Lemma를 적용하여 LCS의 길이를 계산할 수 있다.

두 문자열 $X = x _1 x _2 \cdots x _N$, $Y = y _1 y _2 \cdots y _M$에 대하여, $D _{i, j}$를 $X[1 \cdots i]$와 $Y[1 \cdots j]$의 LCS 길이로 정의하자. 그러면 다음과 같은 재귀적 관계식을 세울 수 있다.

> * $x _i = y _j$라면, $ D _{i, j} = D _{i-1, j-1} + 1 $
> * 그렇지 않다면, $ D _{i, j} = \max \left\\{ D _{i, j-1}, D _{i-1, j} \right\\} $

전자는 **Lemma 1.**, 후자는 **Lemma 2.**에 대응됨에 유의하라.

따라서, 두 문자열의 LCS의 길이는 $D _{N, M}$과 같고, 이 값은 $\displaystyle \mathcal{O} \left( NM \right)$의 시간 복잡도로 계산할 수 있다. $\text{LCS}(X, Y)$ 중 하나의 원소를 알아내는 작업은 $D _{N, M}$의 값이 어디로부터 왔는지를 역추적하여 계산할 수 있다.



# Hunt-Szymanski Algorithm

## 더 빠른 알고리즘의 필요성 제기

해싱이나 문자의 값을 사용하지 않고, 두 문자열의 LCS를 알아내기 위해서는 $\mathcal{O} \left( NM \right)$번의 문자쌍 비교가 반드시 필요함이 [D S. Hirschberg와 J D. Ullman에 의하여 1974년에 증명](https://www.ics.uci.edu/~dan/pubs/p1-ullman.pdf)되었다. 즉, 상기한 고전적 DP 알고리즘은 LCS를 계산하는 최적의 알고리즘이다.

그러나 현실에서, 그리고 많은 정보과학 관련 학문 분야에서 LCS 문제는 자주 사용되기에, 아주 긴 문자열의 LCS를 빠르게 계산하는 알고리즘의 필요성이 점차 대두되었다.

Hunt-Szymanski 알고리즘은 간단한 아이디어로 두 문자열의 LCS를 $mathcal{O} \left( N \lg N \right)$의 실험적 시간 복잡도로 계산한다. 본 글은 이 알고리즘에 대하여 소개하고자 한다.



## 핵심적 관찰

먼저, 고전적 DP 알고리즘의 작동 방식을 생각하자.

두 문자열 "`aeaca`"와 "acea"의 







## Stern-Brocot Tree

페리 수열 $F_n$을 확장하여, 각 유리수의 역수까지 등장하는 수열을 생각하자. 편의상, $ \displaystyle \frac{1}{0} = + \infty $로 생각하면, 이 수열은 $ \displaystyle \frac{0}{1} = 0 $ 이상 $ \displaystyle \frac{1}{0} = + \infty $ 이하인 기약분수를 잘 나열할 것이다.

실제로, $0$ 이상의 모든 유리수는 충분히 큰 $n$에 대하여 확장된 페리 수열 $F' _n$에 정확하게 한 번 등장함을 증명할 수 있다. 이제, 깊이 $n$에 해당하는 층에 확장된 페리 수열 $F' _n$을 적어, 아래 그림과 같은 이진 트리를 생각하자.

![](https://youngyojun.github.io/assets/images/posts/2022-02-18-sigma-sum-stern-brocot/SternBrocotTree.png)

<p style="text-align: center;"><b>그림 1: Stern–Brocot Tree</b></p>

<p style="text-align: center;">확장된 페리 수열 $F' _1$부터 $F' _4$까지 활용하여 깊이 4의 Stern-Brocot Tree를 만들 수 있다.</p>



이 트리는 (1) **완전 이진 검색 트리**이며, (2) **모든 양의 유리수가 정확하게 한 번씩 등장**한다는 강력한 성질을 가진다. 또한, 트리 그 자체로 유리수와 자연수 간의 일대일 대응을 잘 보여준다.

이러한 완전 이진 검색 트리를 [Stern-Brocot Tree](https://en.wikipedia.org/wiki/Stern%E2%80%93Brocot_tree)라고 부른다.





# 결론

수론적 함수는 정수론 뿐만 아니라 컴퓨터과학, 알고리즘, PS 분야에도 사용될 정도로 중요하며 그 폭이 아주 넓다.

우리는 대표적인 수론적 함수 $\sigma (n)$의 구간 합 $ \displaystyle \sum _{k=1}^{N} \sigma(k) $을 효율적으로 계산하는 알고리즘에 대하여 알아보았다.

일반적인 식 전개로는 $ \displaystyle O \left( \sqrt{N} \right) $까지 시간 복잡도를 줄일 수 있었다. 그러나, $N$이 아주 큰 수라면 이 방법도 아직은 느리다.

우리는 $ \displaystyle y = \frac{N}{x} $ 그래프와 구하고자 하는 값과의 관계를 알아내고, 그래프의 볼록성이라는 기하적 특성과 Stern-Brocot Tree 자료구조를 활용하여, 재귀적으로 값을 계산하는 새로운 알고리즘을 조사하였다.

또한, 이 알고리즘의 시간 복잡도가 $ \displaystyle \tilde{O} \left( N^{1/3} \right) $로 아주 효율적임을 밝혔다.

이러한 알고리즘의 아이디어는 다양한 볼록 함수에 대하여 접목시킬 수 있으며, 그 응용성이 높다. 다음 글에는 $\sigma (n)$ 외에 다른 수론적 함수의 구간 합을 효율적으로 계산하는 방법에 대하여 알아본다.
