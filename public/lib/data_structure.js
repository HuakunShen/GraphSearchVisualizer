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

