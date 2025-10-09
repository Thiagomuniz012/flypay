import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  showCancel?: boolean;
  cancelText?: string;
}

const { width } = Dimensions.get('window');

export default function CustomAlert({
  visible,
  title,
  message,
  type,
  onClose,
  onConfirm,
  confirmText = 'OK',
  showCancel = false,
  cancelText = 'Cancelar'
}: CustomAlertProps) {
  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: 'checkmark-circle', color: '#04BF7B' };
      case 'error':
        return { icon: 'close-circle', color: '#FF6B6B' };
      case 'info':
        return { icon: 'information-circle', color: '#4A90E2' };
      default:
        return { icon: 'information-circle', color: '#4A90E2' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
      }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 24,
          width: width * 0.85,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8
        }}>
          <Ionicons name={icon as any} size={48} color={color} style={{ marginBottom: 16 }} />
          
          <Text style={{
            fontSize: 20,
            fontFamily: 'Rubik_700Bold',
            color: '#25384D',
            marginBottom: 8,
            textAlign: 'center'
          }}>
            {title}
          </Text>
          
          <Text style={{
            fontSize: 16,
            fontFamily: 'Rubik_400Regular',
            color: '#7A869A',
            textAlign: 'center',
            marginBottom: 24,
            lineHeight: 22
          }}>
            {message}
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {showCancel && (
              <TouchableOpacity
                onPress={onClose}
                style={{
                  backgroundColor: '#F5F7FA',
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 12,
                  minWidth: 100
                }}
              >
                <Text style={{
                  color: '#7A869A',
                  fontSize: 16,
                  fontFamily: 'Rubik_500Medium',
                  textAlign: 'center'
                }}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              onPress={onConfirm || onClose}
              style={{
                backgroundColor: color,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 12,
                minWidth: 100
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontFamily: 'Rubik_500Medium',
                textAlign: 'center'
              }}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
