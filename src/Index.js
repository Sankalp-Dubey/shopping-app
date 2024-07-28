import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import ProductModal from './ProductModal';

import { incrementQuantity, decrementQuantity} from './cartSlice';

const Index = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const cartItems = useSelector(state => state.cart.items); // Changed to cartItems
  const dispatch = useDispatch();

  const getproducts = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    setData(res?.data);
  };

  const renderStars = rating => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      let name = 'star';
      if (i > rating) {
        name = 'star-o';
      }
      stars.push(<Icon key={i} name={name} size={20} color="#FFD700" />);
    }
    return stars;
  };

  const handleCardPress = item => {
    setSelectedProduct(item);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleIncrement = id => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = id => {
    dispatch(decrementQuantity(id));
  };

  useEffect(() => {
    getproducts();
  }, []);

  return (
    
      <View style={{backgroundColor:"white"}}>
        <ScrollView>
          <View
            style={{
              backgroundColor: 'skyblue',
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Shopping
            </Text>
          </View>
          <View style={{padding: 10, gap: 10}}>
            {data &&
              data?.map((item, index) => {
                const cartItem = cartItems.find(
                  cartItem => cartItem.id === item.id,
                ); // Check if item is in cart
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleCardPress(item)}
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderRadius: 10,
                      padding: 10,
                    }}>
                    <Image
                      source={{uri: `${item?.image}`}}
                      style={{height: 150, width: 120}}
                    />
                    <View style={{padding: 10, width: '70%', gap: 5}}>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 18,
                          color: 'black',
                          flexWrap: 'wrap',
                          width: 'auto',
                        }}>
                        {item?.title}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {renderStars(item?.rating?.rate)}
                        <Text style={{marginLeft: 10, fontSize: 17,color: 'black',}}>
                          {item?.rating?.count}
                        </Text>
                      </View>

                     <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between",paddingRight:10}}>
                     <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 20,
                          color: 'black',
                          flexWrap: 'wrap',
                          width: 'auto',
                          fontWeight: 'bold',
                        }}>
                        Rs. {item?.price}
                      </Text>
                      {cartItem && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                           backgroundColor:"lightgrey",
                           paddingHorizontal:10,
                           borderRadius:10
                          }}>
                          <TouchableOpacity
                            onPress={() => handleDecrement(item.id)}>
                            <Icon name="minus" size={15} color="black" />
                          </TouchableOpacity>
                          <Text style={{marginHorizontal: 10, fontSize: 17,fontWeight:"bold",color:"black"}}>
                            {cartItem.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() => handleIncrement(item.id)}>
                            <Icon name="plus" size={15} color="black" />
                          </TouchableOpacity>
                        </View>
                      )}
                     </View>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 17,
                          color: 'gray',
                          flexWrap: 'wrap',
                          width: 'auto',
                        }}>
                        category: {item?.category}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
        {selectedProduct && (
          <ProductModal
            visible={isModalVisible}
            onClose={handleCloseModal}
            product={selectedProduct}
          />
        )}
      </View>
    
  );
};

export default Index;
