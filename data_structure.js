export class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(element) {
        let node = new Node(element);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    enqueueHead(element) {
        let node = new Node(element);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
    }

    dequeue() {
        if (this.head !== null) {
            let first_element = this.head;
            this.head = this.head.next;
            return first_element.value;
        } else {
            return null;
        }
    }

    isEmpty() {
        return this.head === null;
    }

    clear() {
        this.head = null;
        this.tail = null;
    }
}

Queue.prototype.toString = function queueToString() {
    let str = "Queue: \n\t";
    let curr = this.head;
    while (curr !== null) {
        str += curr.value.toString() + ", ";
        curr = curr.next;
    }
    if (str.lastIndexOf(',') === str.length - 2) {
        str = str.substring(0, str.length - 2) + ';'
    }

    return str;
};

export class MinHeap {
    // Arr[(i -1) / 2] returns its parent node.
    // Arr[(2 * i) + 1] returns its left child node.
    // Arr[(2 * i) + 2] returns its right child node.


    constructor() {
        this.data = [];
    }

    getParentIndex(index) {
        return this.checkIndex() ? Math.floor((index - 1) / 2) : null;
    }

    getLeftChildIndex(index) {
        return this.checkIndex() ? 2 * index + 1 : null;
    }

    getRightChildIndex(index) {
        return this.checkIndex() ? 2 * index + 2 : null;
    }

    swap(index1, index2) {
        if (this.checkIndex(index1) && this.checkIndex(index2)) {
            let tmp = this.data[index1];
            this.data[index1] = this.data[index2];
            this.data[index2] = tmp;
        }
    }

    getMin() {
        return this.data.length > 0 ? this.data[0] : null;
    }

    extractMin() {
        let min = this.getMin();
        if (!min) {
            return null;
        } else if (this.data.length === 1) {
            return this.data.pop();
        } else {
            this.data[0] = this.data.pop();     // move last (max) element to root position
            this.minHeapify(0);           // swap element down until min heap is formed
            return min;
        }
    }

    minHeapify(index) {
        if (!this.isLeaf(index)) {
            const left_child = this.getLeftChildIndex(index);
            const right_child = this.getRightChildIndex(index);
            if (right_child) {
                let min_of_child = this.data[left_child] <= this.data[right_child] ? left_child : right_child;
                if (this.data[index] > this.data[min_of_child]) {
                    this.swap(index, min_of_child);
                    this.minHeapify(min_of_child);
                }
            }
        }
    }

    insert(element) {
        this.data.push(element);
        let current_index = this.data.length - 1;
        while (this.data[current_index] <= this.data[this.getParentIndex(current_index)]) {
            this.swap(current_index, this.getParentIndex(current_index));
            current_index = this.getParentIndex(current_index);
        }
    }

    isLeaf(index) {
        return (index >= this.data.length / 2 && index <= this.data.length);
    }

    isEmpty() {
        return this.data.length === 0;
    }

    checkIndex(index) {
        if (index >= this.data.length || index < 0) {
            console.log("MinHeap Index Error");
            return false;
        } else {
            return true
        }
    }

    isMinHeap() {
        if (this.isLeaf(0)) return true;
        for (let i = 1; i < this.data.length; i++) {
            if (this.data[i] < this.data[this.getParentIndex(i)]) return false;
        }
        return true;
    }

    includes(element) {
        this.data.forEach((ele) => {
            if (ele === element) {
                return true;
            }
        });
        return false;
    }

    test(sample_size = 100) {
        // let heap = new MinHeap();
        // Test Insert
        for (let i = 0; i < sample_size; i++) {
            this.insert(Math.round(Math.random() * 100));
        }
        this.isMinHeap() ? console.log("Insert Test Passed") : console.log("Insert Test Failed");

        // Test Extract Min
        for (let i = 0; i < sample_size; i++) {
            // this.print();
            let min_element = Math.min.apply(Math, this.data);
            let extracted_min = this.extractMin();
            if (min_element !== extracted_min || !this.isMinHeap()) {
                console.log("Extract Min Test Failed");
                this.print();
                return false;
            }
        }
        console.log("Extract Min Test Passed");
        return true;

    }

    print() {
        for (let i = 1; i <= this.data.length / 2; i++) {
            console.log(" PARENT : " + this.data[i]
                + " LEFT CHILD : " + this.data[2 * i]
                + " RIGHT CHILD :" + this.data[2 * i + 1]);
            console.log();
        }
    }

    empty() {
        this.data = [];
    }
}

function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < arr[i + 1]) {
            return false;
        }
    }
    return true
}

