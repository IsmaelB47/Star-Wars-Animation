// ==============================
// IMPORTS
// ==============================
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Modal,
  TouchableOpacity
} from 'react-native';

// Safe area to avoid notch / camera overlap
import { SafeAreaView } from 'react-native-safe-area-context';

// Swipe gesture
import {
  GestureHandlerRootView,
  Swipeable
} from 'react-native-gesture-handler';

// ==============================
// MAIN APP
// ==============================
export default function App() {
  const [screen, setScreen] = useState('planets');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Navigation Buttons */}
          <View style={styles.nav}>
            <NavButton label="Planets" onPress={() => setScreen('planets')} />
            <NavButton label="Films" onPress={() => setScreen('films')} />
            <NavButton label="Ships" onPress={() => setScreen('ships')} />
          </View>

          {/* Render Screens */}
          {screen === 'planets' && <Planets />}
          {screen === 'films' && <Films />}
          {screen === 'ships' && <Ships />}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// ==============================
// NAV BUTTON
// ==============================
function NavButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ==============================
// MODAL (Chapter 23)
// ==============================
function ConfirmationModal({ visible, text, onClose }) {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalInner}>
          <Text style={styles.modalText}>{text}</Text>
          <Text style={styles.modalButton} onPress={onClose}>
            Close
          </Text>
        </View>
      </View>
    </Modal>
  );
}

// ==============================
// PLANETS
// ==============================
function Planets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/planets')
      .then(res => res.json())
      .then(json => setData(json.results || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading planets..." />;

  return (
    <>
      <Title text="Planets" />

      <ConfirmationModal
        visible={visible}
        text={selected}
        onClose={() => setVisible(false)}
      />

      <ScrollView>
        {data.map(item => (
          <Swipeable
            key={item.uid}
            onSwipeableOpen={() => {
              setSelected(item.name);
              setVisible(true);
            }}
          >
            <Item text={item.name} />
          </Swipeable>
        ))}
      </ScrollView>
    </>
  );
}

// ==============================
// FILMS
// ==============================
function Films() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/films')
      .then(res => res.json())
      .then(json => setData(json.result || json.results || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading films..." />;

  return (
    <>
      <Title text="Films" />

      <ConfirmationModal
        visible={visible}
        text={selected}
        onClose={() => setVisible(false)}
      />

      <ScrollView>
        {data.map((item, index) => {
          const title = item.properties?.title || item.title;

          return (
            <Swipeable
              key={index}
              onSwipeableOpen={() => {
                setSelected(title);
                setVisible(true);
              }}
            >
              <Item text={title} />
            </Swipeable>
          );
        })}
      </ScrollView>
    </>
  );
}

// ==============================
// SHIPS
// ==============================
function Ships() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch('https://www.swapi.tech/api/starships')
      .then(res => res.json())
      .then(json => setData(json.results || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Loading ships..." />;

  return (
    <>
      <Title text="Ships" />

      <ConfirmationModal
        visible={visible}
        text={selected}
        onClose={() => setVisible(false)}
      />

      <ScrollView>
        {data.map(item => (
          <Swipeable
            key={item.uid}
            onSwipeableOpen={() => {
              setSelected(item.name);
              setVisible(true);
            }}
          >
            <Item text={item.name} />
          </Swipeable>
        ))}
      </ScrollView>
    </>
  );
}

// ==============================
// REUSABLE COMPONENTS
// ==============================
function Loader({ text }) {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
      <Text>{text}</Text>
    </View>
  );
}

function Title({ text }) {
  return <Text style={styles.title}>{text}</Text>;
}

function Item({ text }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{text}</Text>
    </View>
  );
}

// ==============================
// STYLES
// ==============================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'ghostwhite'
  },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },

  button: {
    padding: 10,
    backgroundColor: 'azure',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'slategrey'
  },

  buttonText: {
    color: 'slategrey',
    fontWeight: 'bold'
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  itemText: {
    fontSize: 18
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalInner: {
    backgroundColor: 'azure',
    padding: 20,
    borderWidth: 1,
    borderColor: 'lightsteelblue',
    borderRadius: 2,
    alignItems: 'center'
  },

  modalText: {
    fontSize: 16,
    margin: 5,
    color: 'slategrey'
  },

  modalButton: {
    fontWeight: 'bold',
    margin: 5,
    color: 'slategrey'
  }
});
