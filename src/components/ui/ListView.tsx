import type { LegendListRenderItemProps } from '@legendapp/list';
import { LegendList } from '@legendapp/list';
import type { ReactElement } from 'react';
import React from 'react';
import type { ListRenderItem } from 'react-native';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { isRTL } from '@/lib/store/languageStore';

/**
 * Props for the ListView component
 */
export interface ListViewProps<T> {
  /**
   * Whether the list is currently loading data
   */
  isLoading?: boolean;
  /**
   * Custom loading component to show when isLoading is true
   */
  LoadingComponent?: ReactElement;
  /**
   * Whether the list is empty (no data to display)
   */
  isEmpty?: boolean;
  /**
   * Custom empty state component to show when isEmpty is true
   */
  EmptyComponent?: ReactElement;
  /**
   * Text to display when list is empty and no EmptyComponent is provided
   */
  emptyText?: string;
  /**
   * Data array to render
   */
  data: ReadonlyArray<T>;
  /**
   * Optional key extractor function
   */
  keyExtractor?: (item: T, index: number) => string;
  /**
   * Estimated item size for LegendList
   */
  estimatedItemSize?: number;
  /**
   * Function to render each item
   * Note: This function is used differently depending on whether we're using FlatList or LegendList
   */
  renderItem: ListRenderItem<T>;
  /**
   * Other list props
   */
  [key: string]: unknown;
}

/**
 * A reusable component that wraps LegendApp's List for better performance,
 * with added support for loading and empty states.
 *
 * For RTL languages, it falls back to using React Native's FlatList.
 */
export function ListView<T>(props: ListViewProps<T>): ReactElement {
  const { styles } = useStyles(stylesheet);

  const {
    isLoading,
    LoadingComponent,
    isEmpty,
    EmptyComponent,
    emptyText = 'No items found',
    data,
    renderItem,
    keyExtractor,
    estimatedItemSize = 50,
    ...restProps
  } = props;

  // Determine if we should show loading state
  if (isLoading) {
    return (
      LoadingComponent || (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
      )
    );
  }

  // Determine if we should show empty state
  if (isEmpty || (data && data.length === 0)) {
    return (
      EmptyComponent || (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
      )
    );
  }

  // Render appropriate list component based on language direction
  if (isRTL()) {
    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...restProps}
      />
    );
  } else {
    return (
      <LegendList
        data={data}
        renderItem={(info: LegendListRenderItemProps<T>) =>
          renderItem({
            item: info.item,
            index: info.index,
            separators: {
              highlight: () => {},
              unhighlight: () => {},
              updateProps: () => {},
            },
          })
        }
        keyExtractor={keyExtractor}
        estimatedItemSize={estimatedItemSize}
        {...restProps}
      />
    );
  }
}

const stylesheet = createStyleSheet({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
  },
});

// usage example:

/* <ListView
  data={items}
  renderItem={({ item }) => <YourItemComponent item={item} />}
  keyExtractor={(item) => item.id}
  estimatedItemSize={80}
  isLoading={isLoadingData}
  isEmpty={items.length === 0}
  emptyText="No items found"
/> */
