import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addToCart, incrementQuantity, decrementQuantity} from './cartSlice';

const ProductModal = ({visible, onClose, product}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const cartItem = cartItems.find(item => item.id === product?.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{uri: product?.image}} style={styles.productImage} />
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={{fontSize: 16, marginVertical: 20,color: 'black',}}>
              description:{'  '}
            </Text>
            <Text style={styles.productDescription}>
              {product?.description}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 20}}>
            {cartItem ? (
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={handleDecrement}>
                  <Icon name="minus" size={15} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                <TouchableOpacity onPress={handleIncrement}>
                  <Icon name="plus" size={15} color="black" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}>
                <Icon name="shopping-cart" size={20} color="white" />
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
  },
  productDescription: {
    fontSize: 16,
    marginVertical: 20,
    width: '70%',
    color: 'black',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
  },
  addToCartText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:"lightgrey",
    paddingHorizontal:20,
    borderRadius:10
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 20,
    color: 'black',
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 15,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
});

export default ProductModal;
