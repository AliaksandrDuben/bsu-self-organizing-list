class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insert(data) {
        var node = new Node(data);
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }   
        else {
            var current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
            current.next.prev = current;
            this.tail.prev = current;
        }
    }

    size() {
        var len = 0, 
            temp = this.head;
        while(temp !== null) {
            temp = temp.next;
            len++;
        }
        return len;
    }

    at(index) {
        if(index < 0) {
            return null;
        }
        var i = 0, 
            temp = this.head;
        while (temp !== null) {
            if (i == index) {
                return temp.data;
            }
            i++;
            temp = temp.next;
        }
        return temp;
    }

     findNode(data) {
        var temp = this.head;
        while (temp !== null) {
            if (temp.data == data){
                return temp;
            }
            temp = temp.next;
        }
        return null;
    }

    toArray() {
        var list = [], 
            temp = this.head;
        while (temp !== null){
            list.push(temp.data);
            temp = temp.next;
        }
        return list;
    }

    removeAt(index) {
        if (index < 0 || index >= this.size()){
            return null;
        }
        else if (!index && this.size() == 1){
            this.tail = this.head = null;
        } else {
            var temp = this.head,
                i = 0;

            while (i != index){
                temp = temp.next;
                i++;
            }

            if (temp == this.tail){
                this.tail = this.tail.prev;
                this.tail.next = null;
            }else if(temp == this.head){
                this.head = this.head.next;
                this.head.prev = null;
            }else{
                temp.prev.next = temp.next;
                temp.next.prev = temp.prev;
            }
        }
    }

    moveToFront(node) {
        if(this.size() > 1 && node != this.head){
            if(node == this.tail){
                this.tail = this.tail.prev;
            }else{
                node.next.prev = node.prev;
            }

            var prevFirst = this.head;
            node.prev.next = node.next;
            node.next = prevFirst;
            prevFirst.prev = node;
            node.prev = null;
            this.head = node;
        }
    }

    reorganize(data) {
        var node = this.findNode(data);
        if(node !== null){
            this.moveToFront(node);
            return true;
        }
        return false;
    }

}


module.exports = {
    SelfOrganizedList,
    Node
};
