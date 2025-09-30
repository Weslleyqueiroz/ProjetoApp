// CustomDateTimePicker.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { style } from './styles';
type CustomDateTimePickerProps = {
    type: 'date' | 'time' | 'datetime';
    onDateChange?: (date: Date) => void;
    show: boolean;
    setShow: (show: boolean) => void;
};

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({ type, onDateChange, show, setShow }) => {
    const [date, setDate] = React.useState(new Date());

    useEffect(() => {
        if (onDateChange) {
            onDateChange(date); 
        }
    }, [date, onDateChange]);

    const onChange = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            <View style={style.modalOverlay}>
                <View style={style.container}>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={type}
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={onChange}
                    />
                    {/* <Text style={styles.dateText}>
                        {date.toLocaleDateString()}
                    </Text> */}
                </View>
            </View>
        </Modal>
    );
};
export default CustomDateTimePicker;