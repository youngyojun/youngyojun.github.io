```
---
title: "Stern-Brocot Tree를 활용한 수론적 함수의 합 계산"
date: 2022-02-18 18:27:10
categories:
 - Secmem
tags:
 - Algorithm
 - Mathematics

---
```



# 개요

정수론에서 주로 다루는 중요한 수론적 함수로는 약수 함수 $\sigma_k (n)$, 오일러 피 함수 $\phi (n)$, 뫼비우스 함수 $\mu (n)$ 등이 있다. 이러한 함수의 학문적 중요도는 이루 말할 수 없으며, 컴퓨터과학와 PS 분야에도 종종 등장할 정도로 다양하게 활용된다.

본 글은 수론적 함수의 대표인 약수 함수 $\sigma (n)$의 구간 합을 효율적으로 계산하는 알고리즘을 서술한다. 함수의 합을 기하적으로 해석한 후, 이를 Stern-Brocot Tree 자료구조로 계산한다. 이후, 이 알고리즘의 시간 복잡도가 $\tilde{O} \left( N^{1/3} \right)$로 아주 효율적임을 보인다.



# 문제 제기

## 약수 함수의 합 문제

양의 정수 $n$에 대하여, $n$의 모든 양의 약수의 $k$제곱의 합을 생각하자. 이것이 약수 함수 $\sigma_k (n)$의 정의이다.

> $$ \sigma_k (n) := \sum_{ d | n } d^k $$



이 글에서는 $k = 1$인 시그마 함수 $\sigma (n) := \sigma_1 (n)$에 대하여 주로 다룬다. 이 값은 $n$의 약수의 합을 나타낸다.



이제, 정수 $N$이 주어졌을 때, 1부터 $N$까지 시그마 함숫값의 합 $ \displaystyle \sum_{k=1}^{N} \sigma(k) $을 구하는 문제를 생각하자.



## 정수론적 접근

$\sigma(1) + \cdots + \sigma(N)$의 값은 다음 조건을 만족하는 양의 정수 쌍 $(n, d)$의 개수와 같다.

> 1. $d$는 $n$의 약수
> 2. $1 \le d \le n \le N$

이는 시그마 함수의 정의를 생각할 때, $\sigma(k)$의 값은 $n = k$인 $(n, d)$의 개수와 같으므로 자명하다.



이제, $d$의 값을 고정한 후, 위의 조건을 만족하는 $n$의 개수를 세자. $n$은 $N$ 이하인 $d$의 배수라야 하므로, 총 $ \displaystyle \left\lfloor \frac{ N }{ d } \right\rfloor $개만큼 존재한다.

$$ \sum _{k=1}^{N} \sigma(k) = \sum _{d=1}^{N} \left\lfloor \frac{ N }{ d } \right\rfloor $$



이는 다르게 해석하면, $y = \frac{N}{x}$ 그래프 아래에 있는 양의 정수 쌍 $(x, y)$의 개수를 세는 것과 같다. 곡선 $xy = N$은 직선 $x = y$에 대하여 대칭이며, 이 둘의 교점은 $\left( \sqrt{N}, \sqrt{N} \right)$이므로, 최종적으로 아래의 식을 얻을 수 있다.

$$ \sum _{d=1}^{N} \left\lfloor \frac{ N }{ d } \right\rfloor = 2 \sum _{x=1}^{ \left\lfloor \sqrt{N} \right\rfloor } \left\lfloor \frac{ N }{ x } \right\rfloor - { \left\lfloor \sqrt{N} \right\rfloor }^2 $$



우리는 시그마 함수 $\sigma(n)$의 값을 어떻게 계산하는지 알지 않아도, 시그마 함수의 합을 $O \left( \sqrt{N} \right)$만에 쉽게 계산할 수 있게 되었다.

그러나 $N$이 $10^{18}$-scale로 아주 큰 수라면, 우리는 이보다도 더욱 효율적인 방법을 찾아야 한다.



# Stern-Brocot Tree

효율적인 알고리즘을 구상하기 전에, 페리 수열과 Stern-Brocot Tree 자료구조에 대하여 먼저 알아보자.

## Farey Sequence

> $n$번째 페리 수열 $F_n$는 다음을 만족하는 모든 기약분수 $ \displaystyle \frac{a}{b} $를 오름차순으로 나열한 수열이다.
>
> 1. $0 \le b \le a \le n$
> 2. $\gcd (a, b) = 1$

