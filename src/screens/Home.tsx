import { useState } from 'react'
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center } from "native-base"
import { SignOut, ChatTeardropText } from 'phosphor-react-native'

import Logo from '../assets/logo_secondary.svg'

import { Filter } from '../components/Filter'
import { Button } from '../components/Button'
import { Order, OrderProps } from '../components/Order'

export function Home() {
   const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
   const [orders, setOrders] = useState<OrderProps[]>([])

   const { colors } = useTheme()

   return (
      <VStack flex={6} pb={6} bg="gray.700">
         <HStack
            w="full"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            pt={12}
            pb={5}
            px={6}
         >
            <Logo />
            <IconButton 
               icon={<SignOut size={26} color={colors.gray[300]}/>}
            />
         </HStack>

         <VStack flex={1} px={6}>
            <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
               <Heading color="gray.100">
                  My tasks
               </Heading>
               <Text color="gray.200">
                  3
               </Text>
            </HStack>

            <HStack space={3} mb={8}>
               <Filter 
                  type="open"
                  title="In progress"
                  onPress={() => setStatusSelected('open')}
                  isActive={statusSelected === 'open'}
               />

               <Filter 
                  type="closed"
                  title="Done"
                  onPress={() => setStatusSelected('closed')}
                  isActive={statusSelected === 'closed'}
               />
            </HStack>

            <FlatList 
               data={orders}
               keyExtractor={item => item.id}
               renderItem={({ item }) => <Order data={item}/>}
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{paddingBottom: 100}}
               ListEmptyComponent={() => (
                  <Center>
                     <ChatTeardropText size={40} color={colors.gray[300]}/>
                     <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                        You have no tasks {'\n'} 
                        {statusSelected === 'open' ? 'in progress' : 'done'}
                     </Text>
                  </Center>
               )}
            />

            <Button title="New task" />
         </VStack>
      </VStack>
   )
}