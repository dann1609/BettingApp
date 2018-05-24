

import {StyleSheet} from 'react-native';


export const colors = {
    white: '#fff',
    white80:'#FFFFFFCC',
    black: '#000',
    darkGray:'#303030',
    darkblue: '#003462',
    blue: '#00619E',
    lightblue:'#D5EFFD',
    transparentBlue: '#4788D388',
    transparent:'#00000000',
    ultraLightGray: '#F9F9F9',
    superLightGray: '#E6EAF0',
    lightGray: '#BBBFC9',
    gray: '#A0A0B0',
    dotGray: '#D6D6D6',
    dotDarkGray: '#B7B7B7',
    transparentGray:'#A0A0B044',
    //mediumGray: '#C3C8D3',
    orange: '#F5A623',
    lightOrange:'#ffeac6',
    orangrend: '#F64A2E',
    transparentorange: '#EA803888',
    neon:'#39FF14'
    // your colors
};

export const dimens = {
    normalGap: 40,
};

export const htmlStyles = StyleSheet.create({
    body:{fontSize:16},
    p: { margin: 0, padding:0, fontSize:16},
    li: { fontSize:16 }
});

export const appStyle = StyleSheet.create({
    icon: {
        width: 20,
        height: 20
    },
    bigIcon: {
        width: 40,
        height: 40
    },
    bits: {
        height: 12,
        width: 12,
        borderRadius: 6,
        marginLeft: 5,
        marginRight: 5
    },
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#d8dce4',
    },
    bigSection: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 22,
        color:colors.white
    },
    section: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 20,
        color:colors.white
    },
    subSectionContainer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#d8dce4',
    },
    subSection: {
        fontSize:16,
    },
    textSection:{
        fontSize: 15,
    },
    semiSubSection: {
        fontSize: 13,
    },
    miniSection: {
        fontSize: 12,
    },
    microSection: {
        fontSize: 10
    },
    nanoSection:{
        fontSize:8
    },
    viewContainer: {
        flex: 1,
        backgroundColor: colors.ultraLightGray,
    },
    viewCenterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ultraLightGray,
    },
    pageContainer: {
        flex: 1,
        backgroundColor: colors.ultraLightGray,
        paddingLeft: 30,
        paddingRight: 30
    },

    buttons: {
        backgroundColor: colors.white,
        width: '50%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: dimens.normalGap/2,
        height:50,
        alignItems: 'center',
        justifyContent:'center'
    },
    square: {
        marginTop: dimens.normalGap / 3,
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        backgroundColor: colors.white,
        width: '90%',
        borderRadius: 10,
        paddingBottom: 10,
        justifyContent: 'space-around',
        alignItems:'center'
    }
});

