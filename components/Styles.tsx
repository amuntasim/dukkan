import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },

    flexContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginScreenContainer: {
        flex: 1
    },
    loginFormView: {
        flex: 1,
        margin: 15
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 5,

    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
    },

    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    modalCloseIcon: {
        position: 'absolute',
        right: 0,
        top:  0,
        fontWeight: 'bold'
    },
    headerIcon: {
        position: 'absolute',
        right: 16,
    },
    headerTitle: {
        flexDirection: 'row'
    },
    centeredHorView: {
        flex: 1,
        marginTop: 22,
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modalView: {
        margin: 10,
        marginTop: '50%',
        // backgroundColor: "white",
        borderRadius: 20,
        borderColor: '#414141',
        justifyContent: "center",
        padding: 15,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 5
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: "#f1f1f1",
    },
    twoColumnItem: {
        width: '50%',
        backgroundColor: "#ffffff",
        margin: 5,
        padding: 5
    }
})

