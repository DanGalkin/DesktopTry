import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

//DONE desctructure the functions and param array in props
const ParamButtons = ({ updateNoteParam, params }) => {
    if(!params) {
        console.log(`No params yet loaded.`);
        return null;
    }
    const [selectedParam, setSelectedParam] = React.useState();

    return (
        <View style={{padding: 10}}>
            <View style={styles.row}>
                {params.sort().map((param) => (
                    <TouchableOpacity
                        key={param}
                        onPress={() => {
                            setSelectedParam(param);
                            updateNoteParam(param);
                        }}
                        style={[styles.button, selectedParam === param && styles.selected]}
                    >
                        <Text
                            style={[
                                styles.buttonLabel,
                                selectedParam === param && styles.selectedLabel,
                            ]}
                        >
                        {param}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
    },
    selected: {
        backgroundColor: "coral",
        borderWidth: 0,
    },
    buttonLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "coral",
    },
    selectedLabel: {
        color: "white",
    },
    label: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 24,
    },
});

export default ParamButtons;