import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { initiateSocket, sendMessage, subscribeToMessages, disconnectSocket } from '../services/socketService';
import { setMessage, setResponseSent, setStatus, selectRequest, clearState } from '../store/requestSlice';


const RequestHandler = ({ roomId }) => {
    const dispatch = useDispatch();
    const { message, responseSent, status } = useSelector(selectRequest);


    useEffect(() => {
        dispatch(clearState());  // Clear previous state when the component is mounted


        initiateSocket(roomId, (connectionStatus) => {
            dispatch(setStatus(connectionStatus));
        });


        subscribeToMessages((msg) => {
            dispatch(setMessage(msg));
        });


        return () => {
            disconnectSocket();
        };
    }, [dispatch, roomId]);


    const handleAccept = () => {
        sendMessage('Request Accepted: Remote ID [12345]');
        dispatch(setResponseSent(true));
    };


    const handleDecline = () => {
        sendMessage('Request Declined');
        dispatch(setResponseSent(true));
    };


    return (
        <View style={styles.container}>
            <Text>Status: {status}</Text>
            {message ? (
                <>
                    <Text style={styles.message}>New request received: {message}</Text>
                    <Button title="Accept" onPress={handleAccept} />
                    <Button title="Decline" onPress={handleDecline} />
                </>
            ) : (
                <Text>No request received yet...</Text>
            )}
            {responseSent && <Text>Response sent to Device 2</Text>}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});


export default RequestHandler;
