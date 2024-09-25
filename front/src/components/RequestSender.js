import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { initiateSocket, sendMessage, subscribeToMessages, disconnectSocket } from '../services/socketService';
import { setStatus, setMessage, selectRequest, clearState } from '../store/requestSlice';


const RequestSender = ({ roomId }) => {
    const dispatch = useDispatch();
    const { message, status } = useSelector(selectRequest);
    const [isWaiting, setIsWaiting] = useState(false);


    useEffect(() => {
        dispatch(clearState());  // Clear state before mounting the component


        initiateSocket(roomId, (connectionStatus) => {
            dispatch(setStatus(connectionStatus));
        });


        subscribeToMessages((msg) => {
            dispatch(setMessage(msg));
            setIsWaiting(false);
        });

        return () => {
            disconnectSocket();
        };
    }, [dispatch, roomId]);


    const sendRequest = () => {
        sendMessage('Vehicle Request from Device 2');
        setIsWaiting(true);
    };


    return (
        <View style={styles.container}>
            <Text>Status: {status}</Text>
            <Button title="Send Request" onPress={sendRequest} />
            {isWaiting && <ActivityIndicator size="large" color="#0000ff" />}
            {message && <Text>Response from Device 1: {message}</Text>}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default RequestSender;
