import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface IExampleItem {
  id: string;
  title: string;
}

/**
 * Example component demonstrating proper function handler pattern
 * without inline arrow functions
 */
const ProperComponentStructure: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Mock data
  const items: IExampleItem[] = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
  ];

  // Use useCallback to memoize function references
  const handleItemPress = useCallback((id: string) => {
    setSelectedItem(id);
  }, []);

  // Factory pattern for creating handlers for specific items
  const createItemPressHandler = useCallback(
    (id: string) => {
      // Return a function that's specific to this item
      return function itemPressHandler() {
        handleItemPress(id);
      };
    },
    [handleItemPress],
  );

  // Handler for reset button
  const handleResetPress = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Properly Structured Component</Text>

      {items.map((item) => {
        // Create a specific handler for this item
        const onItemPress = createItemPressHandler(item.id);

        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.item,
              selectedItem === item.id && styles.selectedItem,
            ]}
            onPress={onItemPress} // No inline arrow function!
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}

      {selectedItem && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            Selected: {items.find((item) => item.id === selectedItem)?.title}
          </Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPress} // No inline arrow function!
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: theme.colors.text,
  },
  item: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: theme.colors.border,
  },
  selectedItem: {
    backgroundColor: theme.colors.tint,
  },
  itemText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  selectedContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: theme.colors.border,
  },
  selectedText: {
    color: theme.colors.text,
    fontSize: 16,
    marginBottom: 8,
  },
  resetButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: theme.colors.tint,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}));

export default ProperComponentStructure;
