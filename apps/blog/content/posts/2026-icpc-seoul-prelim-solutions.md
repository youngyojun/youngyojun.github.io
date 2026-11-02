---
title: "2026 ICPC Asia Seoul Regional Preliminary Solution Sketches"
date: "2026-11-02 20:10:00"
categories: ["ICPC"]
tags: ["ICPC"]
---

**Disclaimer:** This is an **unofficial** analysis of some possible ways to solve the problems of the 2026 ICPC Asia Seoul Regional Preliminary. They are not intended to give complete solutions, but rather to outline some approaches that can be used to solve the problems. If you find an error, please [send me an email](https://youngyojun.github.io/blog/about/) about it.



## K. Square

<small>My solution: 145 bytes.</small>

Let $(a,b)$ be the vector of one side of the square. The other side can be $(-b,a)$, so its area is $a^2+b^2$.

Hence, the answer is `YES` if and only if $n$ is a sum of two squares. This can be checked in $O(\sqrt n)$.



## G. Korean Characters

<small>My solution: 404 bytes.</small>

Scan the string from right to left. If the last letter is a vowel, the last Korean character must have length $2$; otherwise, it must have length $3$.

Check whether the corresponding letters form a valid consonant-vowel(-consonant) pattern, remove them, and repeat. If this is ever impossible, print `-ERROR-`.

This runs in $O(n)$.



## H. Marathon

<small>My solution: 322 bytes.</small>

Binary search the answer $x$.

For a section to have section risk at most $x$, building $i$ requires $\max(0,d_i-x)$ security personnel. Thus, for a fixed $x$, we only need to check whether some length-$l$ subarray has

$$
\sum \max(0,d_i-x) \le k.
$$

Check this with a sliding window in $O(n)$, for a total of $O(n\log \max d_i)$.



## A. Citation Index

<small>My solution: 393 bytes.</small>

Cap every citation count at $n$. Maintain the current h-index $h$, the number of papers with at least $h$ citations, and the frequency of every capped citation count.

Since citation counts only increase, the h-index never decreases, and one update can increase it by at most one. After each update, $h+1$ is feasible exactly when there are at least $h+1$ papers with more than $h$ citations.

This gives $O(n+q)$ time.



## B. Coloring

<small>My solution: 450 bytes.</small>

Let $x_{\min}$, $x_{\max}$, $y_{\min}$, $y_{\max}$ be the extrema among all endpoints. Up to swapping the two colors, an optimal pair of squares can be pushed to one of the two pairs of opposite corners of this bounding box without increasing their side lengths.

Fix the lower-left and upper-right corners. For each segment, try the two assignments of its endpoints to the two squares; each assignment gives the maximum of four distances to the corresponding sides of the bounding box. Take the better assignment independently for every segment, then take the maximum over all segments.

Reflect the $y$-coordinates and repeat to handle the other diagonal pair of corners. The smaller of the two answers is optimal.



## C. Convex Hull

<small>My solution: 549 bytes.</small>

Compute all-pairs shortest-path distances with Floyd--Warshall.

Maintain the current hull and a queue of vertices newly added to it. For a newly added vertex $b$, for every vertex $a$ already in the hull and every vertex $v$ outside it, add $v$ if

$$
d(a,v)+d(v,b)=d(a,b).
$$

Whenever a new vertex is added, process it in the same way. This computes the closure in $O(n^3)$ time.



## J. Secret Agent

<small>My solution: 490 bytes.</small>

Since no interval contains another and all endpoints are distinct, sorting the agents by starting point also sorts them by ending point.

For agent $i$, let $D_i(t)$ be the maximum capability sum of a valid relay ending at $i$ such that the penultimate agent, if it exists, ends no later than $s_i+t$.

Suppose $j$ is immediately before $i$ in the relay. They must overlap, so

$$
s_j<s_i<e_j<e_i.
$$

Every earlier agent must not overlap $i$, so the best previous state is

$$
D_j(s_i-s_j-1).
$$

This transition contributes to state $e_j-s_i$ of $D_i$. Take prefix maxima over $t$ and add $w_i$.

This gives an $O(n^2)$ dynamic program.



## D. Cross Roller

<small>My solution: 1,227 bytes.</small>

Any row or column containing a zero can never be selected by an operation.

Consider the operations in reverse. The last operation must correspond to a non-banned row and a non-banned column that are both monochromatic with the same nonzero color. Remove such a row and column and keep them as fixed anchors.

Afterwards, any remaining monochromatic row can be removed using the fixed column, and any remaining monochromatic column can be removed using the fixed row. Maintain color frequencies while removing rows and columns, and reverse the recorded operations at the end.

If a nonzero cell remains, the target pattern is impossible. The algorithm runs in $O(n^2)$ time.



## F. Interactive String Matching

<small>My solution: 448 bytes.</small>

Simulate KMP, using queries whenever a text character has to be compared with a pattern character.

The only additional difficulty is constructing the prefix function of $T$, since direct comparisons between two characters of $T$ are unavailable. Whenever $T_i$ has to be compared with $T_j$, use a position of $S$ that has already been proved equal to $T_j$, and query that position against $T_i$.

Construct the prefix function lazily only as far as needed by the current KMP state. The usual KMP amortization shows that the total number of queries is at most $2(|S|+|T|)$.



## I. [Pumpkin Friends](https://www.trickcal.com/)

<small>My solution: 908 bytes.</small>

Process the deletions in reverse, so that pumpkins are added one by one. Each addition merges the alive segments on its left and right, and the increase in the joy score is exactly the number of valid intervals containing the newly added pumpkin.

Let $P$ be the prefix-sum array. Since all joy values are positive, for each endpoint we can precompute the range of opposite endpoints whose interval sum lies in $[L,R]$.

When two segments are merged, iterate over the smaller side and count compatible endpoints on the larger side using these precomputed ranges. By the small-to-large argument, each position is scanned only $O(\log n)$ times.

Thus all answers can be computed in $O(n\log n)$ time.



## E. Eating Candies

<small>My solution: 444 bytes.</small>

Associate an integer value with every substring. Let $x$ be the maximum value reachable by a Bay move and $y$ the minimum value reachable by a Rei move, using $-\infty$ and $+\infty$ if the corresponding player has no move.

The value of the current substring is

$$
\begin{cases}
y-1 & y\le 0,\\
x+1 & x\ge 0,\\
0 & x<0<y.
\end{cases}
$$

These values can be computed by interval DP, since every move deletes either the leftmost or the rightmost candy.

The value of the whole game is the sum of the values of all skewers. If the sum is positive, Bay wins; if it is negative, Rei wins; if it is zero, the player who moves first loses.

The total running time is $O\left(\sum |S_i|^2\right)$.

