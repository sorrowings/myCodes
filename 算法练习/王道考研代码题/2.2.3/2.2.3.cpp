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

// 1 ɾ����Сֵ
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

// 2 ��ת����
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

// 3 ɾ������x
// ���ϴ�����j����¼������x�ĸ�������
void Remove_x(SeqList &L, elemtype x)
{
    int j = 0; //��¼xƥ��ĸ���
    for (int i = 0; i < L.length - j; i++)
    {
        if (L.data[i] == x)
            j++;
        L.data[i] = L.data[i + j];
    }
    L.length = L.length - j;
}

// 4 ɾ��ĳһ����
// ɾ���Ĳ��������Խ������ķ�������һ�߱���һ�߸�ֵ�����ϴ𰸸��鷳
bool Delete_s_To_t(SeqList &L, elemtype s, elemtype t)
{
    if (L.length = 0 || s >= t)
        return false;

    int k = 0; //��¼�ڷ�Χ�ڵ�Ԫ�ظ���
    for (int i = 0; i < L.length; i++)
    {
        if (L.data[i] > s && L.data[i] < t) //�ںϷ���Χ��k++���ںϷ���Χ���ֵ��ǰ��
            k++;
        else
            L.data[i] = L.data[i + k];
    }
    L.length = L.length - k;
    return true;
}

// 5
// �͵�����һ��

// 6 �����ȥ��
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
    L.length = j + 1; // j�������±�
}

// 7 �����ϲ�
// ���������Ҵ�С���󣬵��͵��㷨
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

// 8 ���齻��λ��
// ��ת���� ��ָ��λ�÷�ת ��ڶ�����������
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

// 9 �۰����
// �۰����Ϊ�ص�
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
    if (L.data[mid] == x && mid < L.length - 1) //ע��������ж�����
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
// ���Խ�ǰp��������Ϊ����a������������Ϊ����b������ͱ�������齻��������
bool Reverse_2(int R[], int start, int end)
{
    if (start >= end)
        return false;
    int t;
    for (int i = 0; i < (end - start) / 2; i++) //�������ϵĴ��ж������� i<��end-start+1��/2����ʵ������
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

// 11 ��ȡ��λ��
// ��˳���洢����������
// �㷨˼���ǣ��ֱ�ȡ��λ���������ȣ���˵����A����ߵĸ�������B����ߵĸ�����ȣ���A���ұߵĸ�����B���ҵĸ������
elemtype Get_Middle(SeqList A, SeqList B)
{
    int startA = 0, startB = 0, endA = A.length - 1, endB = B.length - 1; //��ʾ�����������ֹλ��
    while (startA != endA || startB != endB)                              //ֻ�е�����ֻʣ��һ��ʱ������ѭ�������ؽ�Сֵ������Ϊʲô�Ƿ��ؽ�Сֵ���Լ���һ��
    {
        if (A.data[(startA + endA) / 2] == B.data[(startB + endB) / 2]) //�����λ������򷵻�
            return A.data[(startA + endA) / 2];
        // ���A����λ��С��B����λ������˵���ϲ��������λ��λ��A���ұߣ���B����ߣ���˺��Ĳ�����ȥ��A����ߺ�B���ұߵĸ�����ͬ
        //���A����λ������B����λ����ȥ��A��ߵģ�ȥ��B�ұߵ�
        if (A.data[(startA + endA) / 2] > B.data[(startB + endB) / 2])
        {
            //˵����ʱʣ���AΪ����������Ϊʲô���������ٸ�������һ�¾�֪����
            if ((startA + endA) % 2 == 0)
            {
                // AΪ������Ҫ��Bȥ��ͬ���ĸ��� ��Ҫ����λ��ǰ��Ķ�ȥ��
                startA = (startA + endA) / 2;
                endB = (startB + endB) / 2;
            }
            if ((startA + endA) % 2 != 0)
            {
                // Ϊż����Ҫ����λ��Ҳȥ��
                startA = (startA + endA) / 2 + 1;
                endB = (startB + endB) / 2;
            }
        }
        else
        {
            //���A����λ��С��B����λ����ȥ��b��ߵģ�ȥ��a�ұߵ�
            if ((startB + endB) % 2 == 0)
            {
                // BΪ������Ҫ��Aȥ��ͬ���ĸ��� ��Ҫ����λ��ǰ��Ķ�ȥ��
                endA = (startA + endA) / 2;
                startB = (startB + endB) / 2;
            }
            if ((startB + endB) % 2 != 0)
            {
                // Ϊż����Ҫ����λ��Ҳȥ��
                endA = (startA + endA) / 2;
                startB = (startB + endB) / 2 + 1;
            }
        }
    }
    return A.data[startA] < B.data[startB] ? A.data[startA] : B.data[startB];
}

// 12 ��ȡ��Ԫ��
// ���Բ����������ٱȽϵķ�ʽ���ź����ڱ���һ�飬cout��������ͬ��һ������ͬ���cout�Ƿ����n/2
// �𰸵ķ��������������Ԫ�أ���Ϊ���������Ҫô��������Ԫ������һ����֣�Ҫô��Ԫ�ض��ֿ������һ��Ϊ��Ԫ��
// ����ѡȡ��һ��Ϊ��Ԫ�أ�Ȼ�������һ�������һ��Ԫ�ز���ͬ�ͼ�����һ������Ϊ0����ѡ��ǰԪ��Ϊ�µĺ�ѡ��ѭ����ϵĺ�ѡԪ��Ҫô����Ԫ�أ�Ҫô��������Ԫ��
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

// 13 Ѱ��δ���ֵ���С������
// ��һ�����鱣����ֵ���������Ȼ�����һ��
// ʱ�临�Ӷ�o(n),�ռ临�Ӷ�o(n)
int Find_MissMin(int A[], int n)
{
    // ��ʼ��һ������B
    int *B = (int *)malloc(n * sizeof(int));
    memset(B, 0, sizeof(int) * n);

    for (int i = 0; i < n; i++)
    {
        if (A[i] > 0 && A[i] < n + 1)
        {
            B[A[i] - 1] = 1; //��A��ֵ�Ž���Ӧ��B�������
        }
    }
    for (int i = 0; i < n; i++)
    {
        if (B[i] == 0)
            return i + 1;
    }
}

// 14 ��Ԫ������̾���
// ��a<=b<=c.����|a-b|+|a-c|+|b-c|=2|c-a|������ɶ�������������⣬���ֻҪÿ�θ������ֵa������Сֵc�Ϳ��Ա��������п��ܽ����Ȼ��Խ�����бȽ�

// ���������ĺ��� s=|a-b|+|a-c|+|b-c|
int Sum_Distance(int a, int b, int c)
{
    return abs(a - b) + abs(a - c) + abs(b - c);
}
// �����ж���Сֵ����
bool F_isMin(int a, int b, int c)
{
    return a <= b && a <= c;
}
int Find_Min_Distance(int A[], int AL, int B[], int BL, int C[], int CL)
{
    int D = Sum_Distance(A[0], B[0], C[0]);
    int a = 0, b = 0, c = 0;
    while (a < AL && b < BL && c < CL && D > 0) //��������һ���������D=0��ʱ�����ֱ���˳�
    {   
        // ����Сֵ����
        if (F_isMin(A[a], B[c], C[c]))
            a++;
        else if (F_isMin(B[c], A[a], C[c]))
            b++;
        else
            c++;
        D = Sum_Distance(A[a], B[b], C[c]) < D ? Sum_Distance(A[a], B[b], C[c]) : D; //����ÿ����룬������С��ֵ
    }
    return D;
}

int main()
{
}
