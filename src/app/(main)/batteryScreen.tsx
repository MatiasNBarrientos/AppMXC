import React, { useEffect, useState } from 'react';
import { View, Text, NativeModules } from 'react-native';

//interfaz del módulo nativo
interface BatteryStatusModule {
  getBatteryStatus: (callback: (error: any, level: number) => void) => void;
}

// Obtenemos el módulo nativo con tipado
const { BatteryStatus } = NativeModules as { BatteryStatus: BatteryStatusModule };

export default function BatteryScreen() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    BatteryStatus.getBatteryStatus((error, level) => {
      if (!error) {
        setBatteryLevel(Math.ceil(level));
      } else {
        console.error('Error al obtener el nivel de batería:', error);
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>
        Nivel de batería: {batteryLevel !== null ? `${batteryLevel}%` : 'Cargando...'}
      </Text>
    </View>
  );
}
