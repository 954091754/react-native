import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MoviePageItemStarsProps {
    score: number; // 0..10
    size?: number; // 星星大小
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
        let star = '☆'; // 空星
        let color = emptyColor;

        if (i < fullStars) {
            star = '★';
            color = filledColor;
        } else if (i === fullStars && hasHalf) {
            star = '⯨'; // 半星，可以换成你喜欢的符号
            color = filledColor;
        }

        stars.push(
            <Text key={i} style={{ fontSize: size, color, marginRight: 1 }}>
                {star}
            </Text>
        );
    }

    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
};

export default MoviePageItemStars;
