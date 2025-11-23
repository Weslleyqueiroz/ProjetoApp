import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    boxTop: {
        height: Dimensions.get('window').height / 4, 
        width: '100%',
        alignItems: "center",
        justifyContent: "flex-end"
    },
    boxMid: {
        flex: 1, 
        width: '100%',
        paddingHorizontal: 20,
    },
    boxBottom: {
        height: Dimensions.get('window').height / 4, 
        width: '100%',
        justifyContent: "flex-start", 
        alignItems: "center",
        paddingTop: 20 
    },
    logo: {
        width: 80,
        height: 80
    },
    text: {
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 18
    },
    tittleInput: {
        marginLeft: 5,
        color: themas.colors.gray,
        marginTop: 15
    },
    icone: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 5, 
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        backgroundColor: themas.colors.secondary,
        borderColor: themas.colors.secondary,
    },
    input: {
        height: '100%',
        width: '91%',
        paddingLeft: 5,
        borderRadius: 40,
    },
    button: {
        height: 30,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.secondary,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    textButton: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    textConta: {
        fontSize: 16,
        color: themas.colors.gray,
        marginBottom: 20 
    },
    textContaCriar: {
        fontSize: 16,
        color: themas.colors.gray
    }
});