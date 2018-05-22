import {Dimensions, Image} from "react-native";

export default tools = {
    findIndexByKey: function (arrayToSearch, key, valueToSearch) {

        for (var i = 0; i < arrayToSearch.length; i++) {
            if (arrayToSearch[i][key] == valueToSearch) {
                //dev.log(i);
                return i;
            }
        }
        return null;
    },
    getFixedScreenDimensions: () => {
        if (Dimensions.get('window').height > Dimensions.get('window').width) {
            return {
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            }
        } else {
            return {
                width: Dimensions.get('window').height,
                height: Dimensions.get('window').width
            }
        }
    },
    getVariableScreenDimensions: () => {
        return {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
        }
    },
    getSize: (source) => {
        return Image.getSize(source, (width, height) => {
            return {ratio: height / width};
        })
    },
    validateEmail: (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    dateToCalendarDate: (date) =>{
        return{
            year:date.getFullYear(),
            month:date.getMonth()+1,
            day:date.getDate(),
            timestamp:date.getTime(),
            dateString:date.toISOString().split("T")[0]
            //date.getFullYear()+'-'+('0'+(date.getMonth()+1)).slice(-2)+'-'+date.getDate(),
        }
    }
}