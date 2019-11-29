import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  View,
  Icon,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {URL, KEY, LOGO} from '../utils/Const';
import NumberFormat from 'react-number-format';

export default class Detail extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.cekOngkosKirim();
  }

  cekOngkosKirim = () => {
    let params = this.props.data;
    const formData = new URLSearchParams();
    formData.append('origin', params.originCity);
    formData.append('destination', params.destinationCity);
    formData.append('weight', params.weight);
    formData.append('courier', params.courier);

    fetch(URL + '/cost', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        key: KEY,
      },
      body: formData.toString(),
    })
      .then(response => response.json())
      .then(responseData => {
        let status = responseData.rajaongkir.status.code;
        // console.log(responseData);
        if (status === 200) {
          this.setState({
            results: responseData.rajaongkir.results[0].costs,
          });
          // console.log(this.state.results);
        }
      });
  };

  render() {
    let costItem = <View />;
    if (this.state.results) {
      costItem = this.state.results.map(item => {
        return (
          <ListItem thumbnail key={new Date().getMilliseconds + Math.random()}>
            <Left>
              <Thumbnail source={{uri: LOGO[this.props.data.courier]}} />
            </Left>
            <Body>
              <Text>{item.service}</Text>
              <Text node>{item.description}</Text>
              <Text>{item.cost[0].etd}</Text>
            </Body>
            <Right>
              <Text>{item.cost[0].value}</Text>
            </Right>
          </ListItem>
        );
      });
    }

    return (
      <Container>
        <Header>
          <Left>
            <Text style={{color: 'white'}} onPress={() => Actions.pop()}>
              Back
            </Text>
          </Left>
          <Body>
            <Title>Ongkos Kirim</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>{costItem}</List>
        </Content>
      </Container>
    );
  }
}
