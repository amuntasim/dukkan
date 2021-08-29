import React from "react";
import {ListItem} from "react-native-elements";
import {Text} from "../../../components/Themed";

export class Order extends React.PureComponent {

    render() {
        const {item} = this.props;
        const orderDetail = () => {

        }
        return (
            <ListItem key={`order--${item.order_id}`} bottomDivider style={{}} onPress={() => orderDetail()}>
                <ListItem.Content style={{}}>
                    <ListItem.Title>
                        <Text>{item.date_added}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle>
                        <Text>#{item.products}</Text>
                    </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                    <Text>{item.status}</Text>
                    <Text>{item.total}</Text>
                </ListItem.Content>
            </ListItem>
        );
    }
}

