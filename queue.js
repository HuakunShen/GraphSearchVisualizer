class Queue {
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

    dequeue(element) {
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
}

Queue.prototype.toString = function queueToString() {
    let str = "Queue: ";
    let curr = this.head;
    while (curr !== null) {
        str += curr.value.toString();
        curr = curr.next;
    }
    return str;
};

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}