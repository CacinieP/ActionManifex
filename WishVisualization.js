import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';

const WishVisualization = () => {
  const [wishes, setWishes] = useState([]);
  const [newWish, setNewWish] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('健康');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const categories = ['健康', '事业', '财富', '家庭', '学习', '旅行', '爱情', '其他'];
  
  const sampleImages = [
    { id: 1, url: 'https://picsum.photos/200/150?random=1', keyword: '健康' },
    { id: 2, url: 'https://picsum.photos/200/150?random=2', keyword: '事业' },
    { id: 3, url: 'https://picsum.photos/200/150?random=3', keyword: '财富' },
    { id: 4, url: 'https://picsum.photos/200/150?random=4', keyword: '家庭' },
    { id: 5, url: 'https://picsum.photos/200/150?random=5', keyword: '学习' },
    { id: 6, url: 'https://picsum.photos/200/150?random=6', keyword: '旅行' },
  ];

  const handleAddWish = () => {
    if (!newWish.trim()) {
      Alert.alert('提示', '请输入您的愿望');
      return;
    }

    const wish = {
      id: Date.now(),
      text: newWish,
      category: selectedCategory,
      image: selectedImage,
      createdAt: new Date().toLocaleString(),
      isOptimized: false
    };

    setWishes([wish, ...wishes]);
    setNewWish('');
    setSelectedImage(null);
  };

  const handleOptimizeWish = async (wishId) => {
    setIsOptimizing(true);
    
    // 模拟AI优化
    setTimeout(() => {
      setWishes(prev => prev.map(wish => 
        wish.id === wishId 
          ? { 
              ...wish, 
              text: `${wish.text} (AI优化版：添加了更丰富的情感表达和具体场景描述)`,
              isOptimized: true 
            }
          : wish
      ));
      setIsOptimizing(false);
      Alert.alert('优化完成', '您的愿望已通过AI优化');
    }, 2000);
  };

  const handleGenerateImage = async (wishId) => {
    setIsGeneratingImage(true);
    
    // 模拟AI绘图
    setTimeout(() => {
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      setWishes(prev => prev.map(wish => 
        wish.id === wishId 
          ? { ...wish, image: randomImage.url }
          : wish
      ));
      setIsGeneratingImage(false);
      Alert.alert('生成完成', 'AI已为您的愿望生成配图');
    }, 3000);
  };

  const renderWishItem = ({ item }) => (
    <View style={styles.wishItem}>
      <View style={styles.wishHeader}>
        <Text style={styles.wishCategory}>{item.category}</Text>
        <Text style={styles.wishDate}>{item.createdAt}</Text>
      </View>
      
      <Text style={styles.wishText}>{item.text}</Text>
      
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          style={styles.wishImage}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.wishActions}>
        {!item.isOptimized && (
          <Button
            title={isOptimizing ? "优化中..." : "AI优化"}
            onPress={() => handleOptimizeWish(item.id)}
            disabled={isOptimizing}
          />
        )}
        
        <Button
          title={isGeneratingImage ? "生成中..." : "生成配图"}
          onPress={() => handleGenerateImage(item.id)}
          disabled={isGeneratingImage}
        />
        
        <Button
          title="选择图片"
          onPress={() => {
            setSelectedWishId(item.id);
            setIsModalVisible(true);
          }}
        />
      </View>
    </View>
  );

  const [selectedWishId, setSelectedWishId] = useState(null);

  const handleImageSelect = (imageUrl) => {
    if (selectedWishId) {
      setWishes(prev => prev.map(wish => 
        wish.id === selectedWishId 
          ? { ...wish, image: imageUrl }
          : wish
      ));
    }
    setIsModalVisible(false);
    setSelectedWishId(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>愿望视觉化</Text>
        <Text style={styles.subtitle}>以"我已经拥有..."表达您的愿望</Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="我已经拥有..."
          value={newWish}
          onChangeText={setNewWish}
          multiline
        />
        
        <ScrollView horizontal style={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.inputActions}>
          <Button title="添加愿望" onPress={handleAddWish} />
          <Button title="语音输入" onPress={() => Alert.alert('提示', '语音输入功能开发中')} />
        </View>
      </View>

      <FlatList
        data={wishes}
        renderItem={renderWishItem}
        keyExtractor={item => item.id.toString()}
        style={styles.wishList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>还没有愿望，快来添加第一个吧！</Text>
          </View>
        }
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>选择配图</Text>
            <Button title="关闭" onPress={() => setIsModalVisible(false)} />
          </View>
          
          <FlatList
            data={sampleImages}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleImageSelect(item.url)}>
                <Image source={{ uri: item.url }} style={styles.modalImage} />
                <Text style={styles.modalImageText}>{item.keyword}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
          />
        </View>
      </Modal>

      {(isOptimizing || isGeneratingImage) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>
            {isOptimizing ? 'AI正在优化您的愿望...' : 'AI正在生成配图...'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  inputSection: {
    padding: 15,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#4CAF50',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  selectedCategoryText: {
    color: 'white',
  },
  inputActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wishList: {
    flex: 1,
    padding: 15,
  },
  wishItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  wishCategory: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  wishDate: {
    fontSize: 12,
    color: '#999',
  },
  wishText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#333',
  },
  wishImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  wishActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalImage: {
    width: '45%',
    height: 150,
    borderRadius: 8,
    margin: '2.5%',
  },
  modalImageText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
});

export default WishVisualization;