/**
 * Created by yuanmiaoyan on 2016/6/20.
 */
function InputValue(searchTxt,str){
    searchTxt.onfocus = function () {
        if (this.value == str) {
            this.value = ""
        }

    }
    searchTxt.onblur = function () {
        if (this.value == "") {
            this.value = str
        }
    }
}
