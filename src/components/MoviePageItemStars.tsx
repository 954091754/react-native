import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MoviePageItemStarsProps {
    score: number; // 0..10
    size?: number;
    filledColor?: string;
    emptyColor?: string;
}

const MoviePageItemStars: React.FC<MoviePageItemStarsProps> = ({
    score,
    size = 16,
    filledColor = '#FFA500',
    emptyColor = '#ccc',
}) => {
    // 将 0..10 转为 0..5 并四舍五入到 0.5
    const normalized = score / 2;
    const rounded = Math.round(normalized * 2) / 2;

    const fullStars = Math.floor(rounded);
    const hasHalf = rounded - fullStars === 0.5;

    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            // 实心星
            stars.push(
                <Text key={i} style={{ fontSize: size, color: filledColor, marginRight: 1 }}>
                    ★
                </Text>
            );
        } else if (i === fullStars && hasHalf) {
            // 半星，用两层 Text + View 遮罩
            stars.push(
                <View
                    key={i}
                    style={{
                        width: size,
                        height: size,
                        marginRight: 1,
                        position: 'relative',
                    }}
                >
                    {/* 空星背景 */}
                    <Text style={{ fontSize: size, color: emptyColor }}>★</Text>
                    {/* 半星遮罩 */}
                    <View
                        style={{
                            position: 'absolute',
                            width: size / 2, // 只显示左半边
                            height: size,
                            overflow: 'hidden',
                        }}
                    >
                        <Text style={{ fontSize: size, color: filledColor }}>★</Text>
                    </View>
                </View>
            );
        } else {
            // 空星
            stars.push(
                <Text key={i} style={{ fontSize: size, color: emptyColor, marginRight: 1 }}>
                    ★
                </Text>
            );
        }
    }

    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default MoviePageItemStars;
