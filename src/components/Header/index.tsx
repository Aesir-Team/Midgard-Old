import { Text, TouchableOpacity, View } from "react-native";
import { User, MagnifyingGlass } from 'phosphor-react-native'
import theme from "../../theme";

export function Header() {
  return (
    <View style={{ height: 50, flexDirection: "row", justifyContent: 'space-between' }}>
      <View style={{ height: 50, width: 50, backgroundColor: theme.colors.purpleLight, borderRadius: 12 }} />
      <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity>
          <MagnifyingGlass weight="bold" size={30} color="#FFFFFF" style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 50, backgroundColor: theme.colors.purpleLight, borderRadius: 12 }} >
          <User weight="bold" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  )
}