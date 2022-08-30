#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#define Maxsize 100;
typedef int elemtype;
typedef struct SeqList
{
    elemtype data[100];
    int length;
};

// 1 删除最小值
elemtype delete_min(SeqList &L)
{
    if (L.length = 0)
        return 0;
    int j = 0;
    int i = 0;
    while (i < L.length)
    {
        i++;
        if (L.data[j] > L.data[i])
            j = i;
    }
    L.data[j] = L.data[i - 1];
    L.length--;
    return L.data[j];
}

// 2 反转数组
void reverse(SeqList &L)
{

    elemtype e;
    for (int i = 0; i < L.length / 2; i++)
    {
        e = L.data[i];
        L.data[i] = L.data[L.length - i - 1];
        L.data[L.length - 1 - i] = e;
    }
}

// 3 删除所有x
// 书上答案上用j来纪录不等于x的个数更简单
void Remove_x(SeqList &L, elemtype x)
{
    int j = 0; //记录x匹配的个数
    for (int i = 0; i < L.length - j; i++)
    {
        if (L.data[i] == x)
            j++;
        L.data[i] = L.data[i + j];
    }
    L.length = L.length - j;
}

// 4 删除某一区间
// 删除的操作都可以借第三题的方法，即一边遍历一边赋值，书上答案更麻烦
bool Delete_s_To_t(SeqList &L, elemtype s, elemtype t)
{
    if (L.length = 0 || s >= t)
        return false;

    int k = 0; //记录在范围内的元素个数
    for (int i = 0; i < L.length; i++)
    {
        if (L.data[i] > s && L.data[i] < t) //在合法范围里k++不在合法范围里的值向前移
            k++;
        else
            L.data[i] = L.data[i + k];
    }
    L.length = L.length - k;
    return true;
}

// 5
// 和第四题一样

// 6 有序表去重
void Delete_SameElem(SeqList &L)
{
    int j = 0;
    for (int i = 1; i < L.length; i++)
    {
        if (L.data[j] != L.data[i])
        {
            L.data[j + 1] = L.data[i];
            j++;
        }
    }
    L.length = j + 1; // j是数组下标
}

// 7 有序表合并
// 数组有序，且从小到大，典型的算法
bool ConcatList(SeqList a, SeqList b, SeqList &c)
{
    if ((a.length + b.length) > Maxsize)
        return false;
    int i = 0;
    int j = 0;
    int k = 0;
    while (i < a.length && j < b.length)
    {
        if (a.data[i] < b.data[j])
        {
            c.data[k++] = a.data[i++];
        }
        else
        {
            c.data[k++] = b.data[j++];
        }
    }
    while (i < a.length)
    {
        c.data[k++] = a.data[i++];
    }
    while (j < b.length)
    {
        c.data[k++] = b.data[j++];
    }
    c.length = k;
    return 1;
}

// 8 数组交换位置
// 反转函数 从指定位置反转 与第二题逆置相结合
bool Reverse(int a[], int l, int r)
{
    if (l >= r)
        return false;
    int temp = 0;
    for (int i = 0; i < (l + r) / 2 - l; i++)
    {
        temp = a[l + i];
        a[l + i] = a[r - i];
        a[r - i] = temp;
    }
    return 1;
}
void Exchange_a_b(int A[], int m, int n)
{
    Reverse(A, 0, m + n - 1);
    Reverse(A, 0, n - 1);
    Reverse(A, n, m + n - 1);
}

// 9 折半查找
// 折半查找为重点
int halfSearch(SeqList &L, elemtype x)
{
    int low = 0, high = L.length - 1, mid;
    while (low <= high)
    {
        mid = (low + high) / 2;
        if (L.data[mid] == x)
            break;
        else if (L.data[mid] < x)
            low = mid + 1;
        else
            high = mid - 1;
    }
    elemtype temp;
    if (L.data[mid] == x && mid < L.length - 1) //注意这里的判断条件
    {
        temp = L.data[x];
        L.data[x] = L.data[x + 1];
        L.data[x + 1] = temp;
    }
    if (low > high)
    {
        for (int i = L.length - 1; i > high; i--)
        {
            L.data[i + 1] = L.data[i];
        }
        L.data[high + 1] = x;
    }
}

// 10
// 可以将前p个数据视为数组a，其余数据视为数组b，问题就变成了数组交换的问题
bool Reverse_2(int R[], int start, int end)
{
    if (start >= end)
        return false;
    int t;
    for (int i = 0; i < (end - start) / 2; i++) //这里书上的答案判断条件是 i<（end-start+1）/2，其实都可以
    {
        int t = R[start + i];
        R[start + i] = R[end - i];
        R[end - i] = t;
    }
}
void Transform(int R[], int p, int n)
{
    Reverse_2(R, 0, p - 1);
    Reverse_2(R, p, n - 1);
    Reverse_2(R, 0, n - 1);
}

// 11 获取中位数
// 用顺序表存储这两个序列
// 算法思想是，分别取中位数，如果相等，则说明在A中左边的个数和在B中左边的个数相等，在A中右边的个数和B中右的个数相等
elemtype Get_Middle(SeqList A, SeqList B)
{
    int startA = 0, startB = 0, endA = A.length - 1, endB = B.length - 1; //表示两个数组的起止位置
    while (startA != endA || startB != endB)                              //只有当两边只剩余一个时才跳出循环，返回较小值，至于为什么是返回较小值，自己试一下
    {
        if (A.data[(startA + endA) / 2] == B.data[(startB + endB) / 2]) //如果中位数相等则返回
            return A.data[(startA + endA) / 2];
        // 如果A的中位数小于B的中位数，则说明合并数组的中位数位于A的右边，和B的左边，因此核心步骤是去掉A的左边和B的右边的个数相同
        //如果A的中位数大于B的中位数，去掉A左边的，去掉B右边的
        if (A.data[(startA + endA) / 2] > B.data[(startB + endB) / 2])
        {
            //说明此时剩余的A为奇数，至于为什么是奇数，举个例子算一下就知道了
            if ((startA + endA) % 2 == 0)
            {
                // A为奇数想要与B去掉同样的个数 需要把中位数前面的都去掉
                startA = (startA + endA) / 2;
                endB = (startB + endB) / 2;
            }
            if ((startA + endA) % 2 != 0)
            {
                // 为偶数需要把中位数也去掉
                startA = (startA + endA) / 2 + 1;
                endB = (startB + endB) / 2;
            }
        }
        else
        {
            //如果A的中位数小于B的中位数，去掉b左边的，去掉a右边的
            if ((startB + endB) % 2 == 0)
            {
                // B为奇数想要与A去掉同样的个数 需要把中位数前面的都去掉
                endA = (startA + endA) / 2;
                startB = (startB + endB) / 2;
            }
            if ((startB + endB) % 2 != 0)
            {
                // 为偶数需要把中位数也去掉
                endA = (startA + endA) / 2;
                startB = (startB + endB) / 2 + 1;
            }
        }
    }
    return A.data[startA] < B.data[startB] ? A.data[startA] : B.data[startB];
}

// 12 获取主元素
// 可以采用先排序再比较的方式，排好序在遍历一遍，cout计数，相同加一，不相同检查cout是否大于n/2
// 答案的方法：如果存在主元素，分为两种情况，要么有两个主元素连在一起出现，要么主元素都分开但最后一个为主元素
// 所以选取第一个为主元素，然后计数加一，如果下一个元素不相同就计数减一，计数为0，则选择当前元素为新的候选，循环完毕的候选元素要么是主元素，要么不存在主元素
int FindMainElem(int A[], int n)
{
    int t = A[0];
    int cout = 1;
    for (int i = 1; i < n; i++)
    {
        if (A[i] == t)
            cout++;
        else
            cout--;
        if (cout == 0)
        {
            t = A[i];
            cout++;
        }
    }
    if (cout > 0)
    {
        for (int i = cout = 0; i < n; i++)
        {
            if (t == A[i])
                cout++;
        }
    }
    if (cout > n / 2)
        return t;
    else
        return -1;
}

// 13 寻找未出现的最小正整数
// 用一个数组保存出现的正整数，然后遍历一遍
// 时间复杂度o(n),空间复杂度o(n)
int Find_MissMin(int A[], int n)
{
    // 初始化一个数组B
    int *B = (int *)malloc(n * sizeof(int));
    memset(B, 0, sizeof(int) * n);

    for (int i = 0; i < n; i++)
    {
        if (A[i] > 0 && A[i] < n + 1)
        {
            B[A[i] - 1] = 1; //将A的值放进对应的B的序号里
        }
    }
    for (int i = 0; i < n; i++)
    {
        if (B[i] == 0)
            return i + 1;
    }
}

// 14 三元组求最短距离
// 设a<=b<=c.则求|a-b|+|a-c|+|b-c|=2|c-a|，即变成对两个点距离的求解，因此只要每次更改最大值a或者最小值c就可以遍历出所有可能结果，然后对结果进行比较

// 定义求距离的函数 s=|a-b|+|a-c|+|b-c|
int Sum_Distance(int a, int b, int c)
{
    return abs(a - b) + abs(a - c) + abs(b - c);
}
// 定义判断最小值函数
bool F_isMin(int a, int b, int c)
{
    return a <= b && a <= c;
}
int Find_Min_Distance(int A[], int AL, int B[], int BL, int C[], int CL)
{
    int D = Sum_Distance(A[0], B[0], C[0]);
    int a = 0, b = 0, c = 0;
    while (a < AL && b < BL && c < CL && D > 0) //当遍历完一个数组或者D=0的时候可以直接退出
    {   
        // 将最小值换掉
        if (F_isMin(A[a], B[c], C[c]))
            a++;
        else if (F_isMin(B[c], A[a], C[c]))
            b++;
        else
            c++;
        D = Sum_Distance(A[a], B[b], C[c]) < D ? Sum_Distance(A[a], B[b], C[c]) : D; //计算每组距离，保留更小的值
    }
    return D;
}

int main()
{
}
