import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
//Text
import CustomText from '../../../components/UI/CustomText';
//Colors
import Colors from '../../../utils/Colors';
import NumberFormat from '../../../components/UI/NumberFormat';

export class TotalButton extends React.PureComponent {
  render() {
    const { total, placeOrder } = this.props;
    return (
      <View style={styles.total}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <CustomText
            style={{ fontSize: 14, fontWeight: '500', color: Colors.text }}
          >
            Total Price
          </CustomText>
          <NumberFormat price={total.toString()} style={{ fontSize: 14 }} />
        </View>

        <TouchableOpacity
          onPress={() => {
            placeOrder();
          }}
        >
          <View style={styles.btn}>
            <CustomText style={{ color: '#fff', fontSize: 16 }}>
              Place your order
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  total: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.red,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  price: {
    color: 'red',
    fontSize: 16,
  },
});
