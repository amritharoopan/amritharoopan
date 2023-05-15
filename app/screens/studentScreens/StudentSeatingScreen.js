import { View, Text, Image, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import StatusBarExcludedArea from '../../components/StatusBarExcludedArea'
import Colors from '../../constants/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import AuthContext from '../../utils/context';
import { getRoomNo, getSeats } from '../../database/DbHelper';

const StudentSeatingScreen = () => {
    const authContext = useContext(AuthContext);
    const [seatList, setSeatList] = useState([]);
    const [roomNo, setRoomNo] = useState('');

    useEffect(() => {
        getRoomNo(authContext.user, (data) => {
            if (data.length > 0) {
                setRoomNo(data[0].room_no);
            }
            console.log(roomNo);
        })

        getSeats(authContext.user, (data) => setSeatList(data));
    }, [])

    const renderSeats = (item) => {
        return (
            <View style={{ alignItems: 'center', margin: 20 }}>
                <MaterialIcons name="event-seat" size={50} color={item.stud_id == authContext.user ? "green" : "black"} />
                <Text>{item.seat_no}</Text>
            </View>
        );
    }
    return (
        <View style={{ backgroundColor: Colors.bgGrey, flex: 1 }}>
            <StatusBarExcludedArea style={{ height: 1 }} />
            <View style={{ alignItems: 'center', flex: 1, marginTop: 30, }} >
                <Text style={{ fontSize: 30, fontWeight: '600' }}>{roomNo}</Text>
                <Image style={{ height: 150, position: 'absolute', right: 0, width: 100 }} source={require('../../../assets/door.png')} />
                <View style={{ height: 100 }} />
                <FlatList
                    columnWrapperStyle={{
                        flex: 1,
                        justifyContent: 'space-between'
                    }}
                    contentContainerStyle={{ marginHorizontal: 10 }}
                    data={seatList}
                    numColumns={4}
                    keyExtractor={(item, index) => 'key_' + index}
                    renderItem={(itemData) => renderSeats(itemData.item)}
                />


            </View>


        </View >
    )
}

export default StudentSeatingScreen