import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Subtitle,
  Right,
  Content,
  Card,
  CardItem,
  Text,
  Item,
  Picker,
  Label,
  Input,
  View,
  Button,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-vector-icons/FontAwesome';
import {KEY, URL} from '../utils/Const';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      provinces: [],
      originCities: [],
      destinationCities: [],
      selectedOriginProvince: null,
      selectedOriginCity: null,
      selectedDestinationProvince: null,
      selectedDestinationCity: null,
      weight: 0,
      courier: null,
    };
  }

  componentDidMount() {
    this.onLoadProvince();
  }

  onLoadProvince = () => {
    fetch(URL + '/province', {
      method: 'GET',
      headers: {
        key: KEY,
      },
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        let status = responseData.rajaongkir.status.code;
        if (status == 200) {
          this.setState({
            provinces: responseData.rajaongkir.results,
          });
        }
      });
  };

  onOriginProvinceChange = val => {
    this.setState(
      {
        selectedOriginProvince: val,
      },
      () => {
        fetch(
          URL +
            '/city?province=' +
            this.state.selectedOriginProvince.province_id,
          {
            method: 'GET',
            headers: {
              key: KEY,
            },
          },
        )
          .then(response => response.json())
          .then(responseData => {
            let status = responseData.rajaongkir.status.code;
            if (status == 200) {
              this.setState({
                originCities: responseData.rajaongkir.results,
              });
            }
          });
      },
    );
  };

  onSelectedProvinceChange = val => {
    this.setState(
      {
        selectedDestinationProvince: val,
      },
      () => {
        fetch(
          URL +
            '/city?province=' +
            this.state.selectedDestinationProvince.province_id,
          {
            method: 'GET',
            headers: {
              key: KEY,
            },
          },
        )
          .then(response => response.json())
          .then(responseData => {
            let status = responseData.rajaongkir.status.code;
            if (status == 200) {
              this.setState({
                destinationCities: responseData.rajaongkir.results,
              });
            }
          });
      },
    );
  };

  onOriginCityChange = val => {
    this.setState({
      selectedOriginCity: val,
    });
  };

  onDestinationCityChange = val => {
    this.setState({
      selectedDestinationCity: val,
    });
  };

  onNavigationToDetail = () => {
    let params = {
      originCity: this.state.selectedOriginCity.city_id,
      destinationCity: this.state.selectedDestinationCity.city_id,
      weight: this.state.weight,
      courier: this.state.courier,
    };
    console.log(params);
    Actions.detail({data:params});
  };

  render() {
    let provinceItems = <View />;
    let provinceItemDestination = <View />;
    let originCityItem = <View />;
    let destinationCityItem = <View />;

    if (this.state.provinces) {
      provinceItems = this.state.provinces.map(prov => {
        return (
          <Picker.Item
            key={prov.province_id}
            label={prov.province}
            value={prov}
          />
        );
      });
    }

    if (this.state.provinces) {
      provinceItemDestination = this.state.provinces.map(prov => {
        return (
          <Picker.Item
            key={prov.province_id}
            label={prov.province}
            value={prov}
          />
        );
      });
    }

    if (this.state.originCities) {
      originCityItem = this.state.originCities.map(city => {
        return (
          <Picker.Item key={city.city_id} label={city.city_name} value={city} />
        );
      });
    }

    if (this.state.destinationCities) {
      destinationCityItem = this.state.destinationCities.map(city => {
        return (
          <Picker.Item key={city.city_id} label={city.city_name} value={city} />
        );
      });
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon type="fontAwesome" name="chevron-left" icon={WalletIcon} />
            </Button>
          </Left>
          <Body>
            <Title>Rajanya Ongkir</Title>
            <Subtitle>Input Data</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem header>
              <Text style={{fontWeight: 'bold'}}>Alamat Asal</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    style={{width: undefined}}
                    placeholder="Pilih Provinsi"
                    selectedValue={this.state.selectedOriginProvince}
                    onValueChange={this.onOriginProvinceChange}>
                    <Picker.Item label="Pilih Provinsi" value="key0" />
                    {provinceItems}
                  </Picker>
                </Item>
                <Item picker style={{marginTop: 15}}>
                  <Picker
                    mode="dropdown"
                    style={{width: undefined}}
                    placeholder="Pilih Kota"
                    selectedValue={this.state.selectedOriginCity}
                    onValueChange={this.onOriginCityChange}>
                    <Picker.Item label="Pilih Kota" value="key0" />
                    {originCityItem}
                  </Picker>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
              
            <CardItem header>
              <Text style={{fontWeight: 'bold'}}>Alamat Tujuan</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    style={{width: undefined}}
                    placeholder="Pilih Provinsi"
                    placeholderStyle={{color: '#bfc6ea'}}
                    selectedValue={this.state.selectedDestinationProvince}
                    onValueChange={this.onSelectedProvinceChange}>
                    <Picker.Item label="Pilih Provinsi" value="key0" />
                    {provinceItemDestination}
                  </Picker>
                </Item>
                <Item picker style={{marginTop: 15}}>
                  <Picker
                    mode="dropdown"
                    style={{width: undefined}}
                    placeholder="Pilih Kota"
                    placeholderStyle={{color: '#bfc6ea'}}
                    selectedValue={this.state.selectedDestinationCity}
                    onValueChange={this.onDestinationCityChange}>
                    <Picker.Item label="Pilih Kota" value="key0" />
                    {destinationCityItem}
                  </Picker>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text style={{fontWeight: 'bold'}}>Berat Barang</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item floatingLabel>
                  <Label>Grams</Label>
                  <Input
                    onChangeText={val => this.setState({weight: val})}
                    maxLength={6}
                  />
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <Text style={{fontWeight: 'bold'}}>Kurir</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    style={{width: undefined}}
                    placeholder="Pilih Kurir"
                    placeholderStyle={{color: '#bfc6ea'}}
                    selectedValue={this.state.courier}
                    onValueChange={val => this.setState({courier: val})}>
                    <Picker.Item label="Pilih Kurir" value="key0" />
                    <Picker.Item label="JNE" value="jne" />
                    <Picker.Item label="Tiki" value="tiki" />
                    <Picker.Item label="POS" value="pos" />
                  </Picker>
                </Item>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <View style={{justifyContent: 'flex-end'}}>
          <Button
            onPress={this.onNavigationToDetail}
            block
            style={{margin: 10}}>
            <Text>Cek Ongkir</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
