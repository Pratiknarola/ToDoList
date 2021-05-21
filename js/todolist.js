export default class ToDoList {
    constructor() {
        this._list = [];
    }

    getlist() {
        return this._list;
    }

    clearlist() {
        this._list = [];
    }

    addItemtoList(itemObj){
        this._list.push(itemObj);
    }

    removeItemfromList(id) {
        const list = this._list;
        for(let i = 0; i < list.length; i++){
            if(list[i]._id == id){
                list.splice(i, 1);
                break;
            }
        }
    }

}