'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		var root = this.root,
            newNode = new Node(data);

		if(!this.root){
            this.root = newNode; return;
		}

		while(root){
            if(data < root.data){
                if(!root.left){
                    root.left = newNode; break;
                }
                else { root = root.left; }
            }
            else {
                if(!root.right){
                    root.right = newNode; break;
                }
                else { root = root.right; }
            }
		}
	}

	contains(data) {
		var located = false,
			actual = this.root;

        while(!located && actual){
            if (data < actual.data){
                actual = actual.left;	
            } 
            else if (data > actual.data){
                actual = actual.right;
            } 
            else { located = true; }
        }
        return located;
    }
	
	remove(data) {
	    var located = false,
			parent = null,
			actual = this.root,
            childTotal,
            change,
            changeParent;

        while(located === false  && actual){
            if (data < actual.data){
                parent = actual;
                actual = actual.left;
            } 
            else if (data > actual.data){
                parent = actual;
                actual = actual.right;
            } 
            else { located = true; }
        }
        if (located){
			childTotal = (actual.left !== null ? 1 : 0) + 
						(actual.right !== null ? 1 : 0);
			if (actual === this.root){
                switch(childTotal){
                    case 0:
                    this.root = null; break;
					
                    case 1:
                    this.root = (actual.right === null ? 
                                actual.left : actual.right); break;
								
                    case 2:
                    change = this.root.left;

                    if (change.right !== null){
                        changeParent = change;
                        change = change.right;
                    }
                    else if (changeParent !== null){
                        changeParent.right = change.left;
                        change.right = this.root.right;
                        change.left = this.root.left;
                    } 
                    else { change.right = this.root.right; }
                    this.root = rchange;
			     }        
			} 
            else {
                switch (childTotal){
                    case 0:
                    if (actual.data < parent.data){
                        parent.left = null;
                    } 
                    else { parent.right = null; }
                    break;
                    case 1:
                    if (actual.data < parent.data){
                        parent.left = (actual.left === null ? 
                                       actual.right : actual.left);
                    } 
                    else {
                        parent.right = (actual.left === null ? 
							         	actual.right : actual.left);
                    }
                    break;    
                    case 2:
                    change = actual.left;
                    changeParent = actual;

                    if (change.right !== null){
                        changeParent = change;
                        change = change.right;
                    }
                    changeParent.left = change.left;
                    change.right = actual.right;
                    change.left = actual.left;

                    if (actual.data < parent.data){
                        parent.left = change;
                    } 
                    else { parent.right = change; }     
                }
			}
		}
	}

	size() {
	
		var length = 0,
            root = this.root;

		while (root === null){
			return length;
		}
        
		if (root) {length++;
			(function measure(node) {
				if (node.left) {
				//	alert("Пре(лев): " + node.left.data + " , " + length);
                    length++;
				//	alert(node.left.data + " , " + length);
					measure(node.left);	
				}
				if (node.right) {
				//	alert("Пре(прав): " + node.right.data + " , " + length);
					length++;
				//	alert(node.right.data + " , " + length);
					measure(node.right);
				}
			})(root);
			}
        return length;
        }

	isEmpty() {
		return !this.root;
	}
}
