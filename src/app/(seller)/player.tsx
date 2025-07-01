import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { useLocalSearchParams } from 'expo-router';
import { featuredBeats } from '@/src/constants/beats';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function PlayerScreen() {
  const { id } = useLocalSearchParams();
  const beat = featuredBeats.find(b => b.id === id);
  const dynamicStyles = useDynamicStyles();

  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const soundRef = useRef<Audio.Sound | null>(null);

  const audioAsset = beat?.audio;

  const handlePlayPause = async () => {
    if (!beat) return;
    try {
      if (soundRef.current === null) {
        setLoading(true);
        const { sound } = await Audio.Sound.createAsync(audioAsset, { shouldPlay: true });
        soundRef.current = sound;
        setLoading(false);
        setIsPlaying(true);
        const status = await sound.getStatusAsync();
        setDuration(status.durationMillis ?? 0);
        setPosition(status.positionMillis ?? 0);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isLoaded) return;
          setPosition(status.positionMillis ?? 0);
          setDuration(status.durationMillis ?? 0);
          if (status.didJustFinish) {
            setIsPlaying(false);
            sound.unloadAsync();
            soundRef.current = null;
            setPosition(0);
          }
        });
      } else if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (e) {
      setLoading(false);
      setIsPlaying(false);
    }
  };

  const handleSeek = async (value: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
      setPosition(value);
    }
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setIsPlaying(false);
      setLoading(false);
      setDuration(0);
      setPosition(0);
    };
  }, [id]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []);

  if (!beat) {
    return (
      <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
        <Text style={{ color: dynamicStyles.themeColors.text }}>Beat no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
      <Image source={beat.image} style={styles.image} />
      <Text style={[styles.title, { color: dynamicStyles.themeColors.text }]}>{beat.title}</Text>
      <Text style={[styles.producer, { color: dynamicStyles.themeColors.secondary }]}>Prod: {beat.producer}</Text>
      <Text style={[styles.genre, { color: dynamicStyles.themeColors.text }]}>Género: {beat.genre}</Text>
      <Text style={[styles.price, { color: dynamicStyles.themeColors.accent }]}>${beat.price}</Text>
      <Text style={[styles.info, { color: dynamicStyles.themeColors.text }]}>BPM: {beat.bpm}</Text>
      <Text style={[styles.info, { color: dynamicStyles.themeColors.text }]}>Escala: {beat.scale}</Text>

      
      <View style={styles.progressContainer}>
        <Text style={[styles.time, { color: dynamicStyles.themeColors.text }]}>{formatTime(position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor={dynamicStyles.themeColors.primary}
          maximumTrackTintColor={dynamicStyles.themeColors.secondary}
          thumbTintColor={dynamicStyles.themeColors.primary}
          onSlidingComplete={handleSeek}
          disabled={loading || !duration}
        />
        <Text style={[styles.time, { color: dynamicStyles.themeColors.text }]}>{formatTime(duration)}</Text>
      </View>

      
      <TouchableOpacity
        style={[
          styles.audioButton,
          { backgroundColor: dynamicStyles.themeColors.primary }
        ]}
        onPress={handlePlayPause}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={32}
            color="#fff"
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  image: { width: 200, height: 200, borderRadius: 12, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  producer: { fontSize: 18, marginBottom: 8 },
  genre: { fontSize: 16, marginBottom: 8 },
  price: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  info: { fontSize: 16, marginBottom: 4 },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    marginTop: 8,
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
    height: 40,
  },
  time: {
    fontSize: 14,
    width: 40,
    textAlign: 'center',
  },
  audioButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
});