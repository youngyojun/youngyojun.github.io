---
title: "2025 ICPC Asia Seoul Regional Finals Solution Sketches"
date: 2025-11-22 18:00:00 +0900
categories:
 - ICPC
tags:
 - ICPC
---



**Disclaimer:** This is an **unofficial** analysis of some possible ways to solve the problems of the 2025 ICPC Asia Seoul Regional Finals. They are not intended to give complete solutions, but rather to outline some approaches that can be used to solve the problems. If you find an error, please [send me an email](https://youngyojun.github.io/about/) about it.


**Live Solutions Presentation**: https://www.youtube.com/live/5L4TCvByfCQ?t=1534s


## M. Triple Fairness

<small>My solution: 41 bytes.</small>

Print $1$ to $n$, three times.



## L. Segments

<small>My solution: 289 bytes.</small>

The answer is determined solely by the maximum of the left endpoints and the minimum of the right endpoints of the given line segments.

When computing the answer, remember to apply $\max(0, \cdot)$.



## C. Bay

<small>My solution: 752 bytes.</small>

Treat the grid cells as vertices to form a rooted forest; then, via DFS, one can identify all edges that constitute the solution. Be sure to choose the vertices connected to the exterior of the grid as roots.

Alternatively, the problem can be solved by supporting "sum of cross products along a path" queries efficiently on the given tree $T$. However, when applying Pick's theorem, the number of interior lattice points may not be zero.



## I. Magic Door

<small>My solution: 1,153 bytes.</small>

Implement the rules exactly as specified. Within the gem-type encoding scheme defined in the problem, it helps to translate into a representation you are comfortable with—for example, distinguishing bombs by whether they are active or not. Treat a match-3 group as the union of matches whose length is exactly $3$, and observe that repeatedly triggering activated bombs in the same row/column does not change the total time complexity, which simplifies implementation.

You must handle the problem's "simultaneously" requirement without missed or overwritten states. Using a "to-be-removed" bit flag (e.g., $16$) is effective.

Be careful not to early-terminate. For instance, you must continue processing even when there are activated bombs but no match-3 groups.



## G. Extraterrestrial Creatures

<small>My solution: 449 bytes.</small>

Let $f(t)$ denote the number of button presses required to make all creature numbers at least $t$. Use binary search to find $t$ such that $f(t) \le X < f(t + 1)$.

After raising all creature numbers to at least $t$, apply one additional press to exactly $\left( X - f(t) \right)$ creatures whose values are exactly $t$, chosen in increasing order of their IDs.



## E. Clean Arrangements

<small>My solution: 415 bytes.</small>

For each vertex $v$, let $D_v$ be the minimum of "(cost of a clean arrangement of the subtree $T_v$) + (total length in which the edge joining $v$ to its parent overlaps the interval of $T_v$)".

Sort the child subtrees of $v$ in decreasing order of size and place them alternately to the left and right around $v$; this minimizes $D_v$.

For the root, a slightly different expression is used for the objective, but the same placement strategy is optimal. The overall time complexity is $O(n)$.



## K. Quadrants

<small>My solution: 1,189 bytes.</small>

Fix a point and draw two perpendicular lines through it. Rotate these lines while maintaining the counts of points in each of the four quadrants. For convenience, call the lines the $x$- and $y$-axes. When another point lies on the $+x$ ray, let the quadrant counts be $c_{*, *}$. Then the current state uniquely determines the $\left[ c_{+,+}, c_{+,+} + c_{-,+} \right)$-quadrants in the region $y > 0$ and the $\left[ c_{+,-}, c_{+,-} + c_{-,-} \right)$-quadrants in the region $y < 0$.



## D. Bookshelf

<small>My solution: 451 bytes.</small>

The initial positions are irrelevant. Let the width of book $i$ be $A_i$, and define $w := L - \sum_i A_i$. Any book can be swapped with a book of width $\le w$, while the relative order of two books with width $> w$ is invariant.

Anchor the favorite book, and place all books with width $> w$ to its left and right. The remaining books with width $\le w$ can always be fitted into the leftover gaps.

It therefore suffices to test feasibility over all possible relative orderings between the favorite book and the other books with width $> w$.



## F. CPEquivalence

<small>My solution: 2,894 bytes.</small>

Two arrays are CP-equivalent if and only if the max Cartesian trees constructed from them are isomorphic.

Let $T$ be the Cartesian tree of $x$. For a subarray $y[s \cdots e]$, define $D_{[s, e], c, T_v}$ as the minimum possible value at the node of $y$’s Cartesian tree corresponding to $v$, over all ways to transform $y[s \cdots e]$ with at most $c$ edits so that its Cartesian tree becomes isomorphic to the subtree $T_v$. A straightforward recursive recurrence follows, but its time complexity has degree $6$. By leveraging the monotonicity of $D_{*}$ and applying a two-pointer technique with suitable precomputation, the degree can be reduced.



## J. Mex Culpa

<small>My solution: 2,539 bytes.</small>

Define $I_i := \left[ a_i , a_i + b_i \right]$. The inequality in the problem is equivalent to $I_i \cap I_j \ne \emptyset$.

First, identify all indices $i$ with $f_i = 0$. By repeatedly querying, for a given interval $J$, the smallest index $i$ such that $I_i \subseteq J$, we can recover all entries with $f_{*} = 0$.

After removing these, proceed analogously to find $f_{*} = 1, 2, \cdots$ in order.



## [A. Adventurer Dabi](https://www.youtube.com/@arahashitabi)

<small>My solution: 6,154 bytes.</small>

This is a heavy-implementation problem. Implement the following in order:

1. Move to an arbitrary cell adjacent to a wall.
2. Discover all walls using the right-hand rule.
3. Identify all teleport cells.
4. Recover the full teleport pairs connectivity.
5. From the key cell, travel to the treasure chest cell via a shortest path.

The following observation suffices: suppose Dabi is either at a known cell $\alpha$ or, via teleportation, at an unknown cell $\beta$. To distinguish the two, starting from $\alpha$, move—using only known cells—to a cell adjacent to a wall, then apply the right-hand rule. If no contradiction arises, it was $\alpha$; if a contradiction occurs, it was $\beta$. Since all moves are invertible, upon detecting a contradiction you can revert to a known state.



## H. Fair Problemset

<small>My solution: 743 bytes.</small>

Let $\lambda_n$ denote the number of Fair Problemset sequences of length $3n$. Writing $n = 3q + r$ and setting $\alpha := q + \delta_{r, 1}$ and $\beta := q + \delta_{r, 2}$, we have
$$\lambda_n = (\alpha!)^3 (\beta!)^6 C_n$$
where $C_n$ is the number of tuples $\left( \sigma_0, \sigma_1, \cdots, \sigma_{n - 1} \right) \in \Sigma_{3}^{n}$ satisfying
$$\alpha \delta_{i, j} + \beta \left( 1 - \delta_{i, j} \right) = \left\lvert \left\{ k : \sigma_k (i) = j \right\} \right\rvert$$
Inspecting the six elements of $\Sigma_3$ yields
$$C_n = \sum_{i = 0}^{q} {\binom{n}{\alpha - i ; i ; i ; i ; \beta - i ; \beta - i}}^{3}$$
Define $B_q := \sum_{i = 0}^{q} {\binom{q}{i}}^{3}$. For $r = 0$, one obtains $C_n = n! (q!)^{6} B_q$. For $r = 1, 2$, $C_n$ can be expressed similarly in terms of $B_q$ and $B_{q + 1}$.



## B. Badge Relay

<small>My solution: 3,538 bytes.</small>

First, for $n \ge 3$ people with times $t_1 \le t_2 \le \cdots \le t_n$, the answer is
$$(n - k - 2) t_1 + (2k + 1) t_2 + \sum_{i = 3}^{n - 2k} t_i + \sum_{i = 0}^{k - 1} t_{n - 2i}$$
where $m := \max\left\\{ j : t_j \le 2 t_2 - t_1 \right\\}$ and $k := \left\lfloor (n - m) / 2 \right\rfloor$. A greedy strategy is optimal—this can be strongly supported by local testing, and proved rigorously in several ways. For an elegant approach, see: M. Jianu, M. Jianu, and S. A. Popescu, "A Combinatorial Solution for Bridge and Torch Problem," *SN Operations Research Forum*, 1(3), Article 21, Aug. 2020, doi: 10.1007/s43069-020-00022-3.

The final summation term is the trickiest to compute efficiently. After applying standard Mo's ordering to the query index intervals, maintain in a segment tree quantities such as "the sum of values that are the $1$st, $3$rd, $5$th, $\cdots$ largest." The overall time complexity is $O \left( q \sqrt{n} \log n \right)$.

