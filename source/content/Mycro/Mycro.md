O Mycro é um projeto de Micromouse simples para a competição da Robochallenge, o hardware funcionou em geral (menos alguns detalhes que serão comentados após). A publicação nesse artigo serve para ajudar pessoas que estão entrando na categoria e querem entrar na categoria com um robô mais simples e fácil de se projetar.

![[Sem título.jpg]]
## Power 
A placa tem basicamente 3 níveis de tensão: A tensão da bateria (que varia de acordo com que ela se descarrega), 5V e 3.3V. O rail de 5V serve para somente diminuir a tensão para o regulador linear, com exceção de um componente que utiliza os 5V. O rail de 3.3V é utilizado para quase todo o resto da placa com exceção da parte de potência que controla os motores que utiliza a tensão da bateria.
### Os 5V
Os 5V como comentado anteriormente quase não tem uso, servindo basicamente para garantir que o regulador linear não falhe devido a uma grande potência dissipada.

Para regular a tensão foi utilizado um TPS82140, um regulador buck com indutor integrado da Texas Instruments. Ele foi escolhido principalmente para diminuir a complexidade do design e permitir que o projeto fosse terminado mais rapidamente. Além disso um dos benefícios dele por consequencia foi não ocupar tanto espaço na placa, sempre bom ter mais espaço :D.

![[Pasted image 20250320021239.png]]

O circuito final foi o seguinte: 

![[Pasted image 20250320021422.png]]

![[Pasted image 20250320021751.png]]

Vale comentar algumas coisas que atualmente eu mudaria. Utilizar um resistor no valor de 52k3 foi extremamente incomodo depois, enquanto ao comprar em um grande distribuidor como a Mouser ou Digikey você conseguiria achar ele facilmente, no Brasil tentar comprar de um local como o Mercado Livre ou outra loja é extremamente difícil (principalmente considerando o encapsulamento 0603 que muitos tem medo pelo tamanho). Nesse caso o ideal teria sido escolher valores diferente para os resistores de feedback ou até mesmo fazer alguma associação de resistores que fosse adequada.

O capacitor de 22u sofreu do mesmo problema, porém pior. Na tensão de operação dele e encapsulamento é extremamente difícil achar um fabricante que faça capacitores com 22u ou mais. O ideal então seria alterar ele para um encapsulamento maior que faria com que fosse muito mais fácil achar um componente adequado.

### Os 3.3V
Os 3.3V é provavelmente o rail mais importante da placa, ele alimenta o microcontrolador, IMU, sensores de parede e mais. Considerando então que os sensores de parede poderiam ter suas saídas afetadas por uma variação na sua tensão de alimentação foi decidido utilizar um regulador linear que teria menos ruído comparado com um conversor buck que costuma ter uma quantidade considerável de ripple na sua saída.

O circuito em si é muito simples, consistindo basicamente de um CI 1117 que você acha em qualquer lugar e os dois capacitores de desacoplamento adequados na sua saída e entrada.

![[Pasted image 20250320022739.png]]

No esquemático foi anotado que caso fosse necessário ainda uma saída com menos ruído poderia ter sido usado um CI alternativo, no final não foi necessário.

![[Pasted image 20250320022910.png]]

### A bateria
A bateria não dimensionada com todo o cuidado, porém levando em conta projetos anteriores que foram observados foi percebido que 300mAh costuma ser mais do que o suficiente. A bateria então foi uma LiPo 2S high voltage (tensão da célula de 4.25V em vez de 4.2V) de 300mAh.

Vale lembrar também que uma das principais considerações no projeto é o peso final do robô pois ele determina a sua aceleração máxima então escolher a bateria mais leve possível é essencial.

![[Pasted image 20250320023335.png]]

### Vale comentar também
Para que houvesse um indicador visual de que as tensões da placa estão adequadas foi utilizado um LED RGB para uma visualização rápida. Um problema que sempre ocorreu em robôs seguidores de linha quando alguém pedia minha ajuda com um problema era que o regulador de tensão falhou e esqueceram de medir a tensão. Com um indicador visual fica mais difícil esquecer.

![[Pasted image 20250320023630.png]]


Também Foi adicionado um circuito simples (mesmo que overkill) para medir a tensão da bateria. Ele serviria para que caso fosse necessário para um algoritmo de controle saber a tensão da bateria seria possível saber qual ela era. No fim das contas não foi necessário e o circuito não foi populado na placa.

![[Pasted image 20250320024157.png]]

É interessante mencionar também o fato do CI ter múltiplas versões diferentes com o mesmo encapsulamento porém com pinouts diferentes (Tem de se tomar muito cuidado na hora de fazer a compra).

O circuito em si também poderia ser somente o divisor de tensão indo a uma porta analógica do microcontrolador, o opamp foi adicionado para evitar um efeito de carga no divisor de tensão porém ele é completamente desnecessário.

Um ultimo detalhe é a chave de desliga e liga e o capacitor de bulk

![[Pasted image 20250320024749.png]]

Não tem nada de especial aqui, além do capacitor eletrolítico da Nichicon que é minúsculo

![[Pasted image 20250320025000.png]]

(Vou trocar essa foto por uma melhor no futuro, prometo que ele é bem bonito ;) )
## Os sensores

Os sensores talvez sejam a parte mais importante do projeto, sem eles o seu robô não conseguiria fazer nada, portanto é de extrema importância acertar na escolha deles. É importante então lembrar o que um sensor bom deve ser. Um sensor bom tem de ler rapidamente, preciso, não quero ler uma parede da frente quando estou querendo ler uma que esta a minha frente, e um bônus seria ele ser simples de se trabalhar com.

Levando isso em conta foi decidido fazer um sensor utilizando um LED IR e um fototransistor. O sensor nos testes não foi muito preciso, não tendo leituras consistentes, tendo uma saída muito dependente da quantidade de luz solar no ambiente. Porém teoricamente o sensor deveria funcionar nessas condições e o que faltou foi muito provavelmente uma calibração mais adequada do mesmo no software.

Os paramêtros que você precisa procurar nos seu LED´s e fototransistores são o comprimento de onda da luz que eles mais emitem no caso dos LED´s e o que eles tem a maior resposta no caso dos fototransistores, também é importante avaliar o ângulo de meia potência dos componentes pois isso irá definir a área que o seu sensor vai ler. Para os LED´s também é importante considerar a quantidade de luz que eles emitem em certa corrente.

Levando isso em consideração foram escolhidos os LED´s SFH 4550 e fototransistores SF 330 para o sensor.

![[Pasted image 20250320030255.png]]

![[Pasted image 20250320030323.png]]

Os componentes são apoiados em uma estrutura de impressão simples para garantir o alinhamento deles.

É também importante mencionar que os sensores são ligados individualmente, um de cada vez, para evitar interferência e para que o consumo de corrente da placa não seja muito grande, pois cada um quando ligado consumiria 100mA.

## O IMU

O IMU (Inertial Measurement Unit) que possuí um acelerômetro e um giroscópio no mesmo CI serviria para auxiliar no controle do robô porém devido a um erro de hardware ou software, não foi implementado ainda. O circuito no entanto é bem simples, o CI do LSM6DRX se comunica com o microcontrolador via uma interface SPI, porém devido ao pino de chip select estar permanentemente ativo no hardware talvez isso tenha impedido o IMU de funcionar. No entanto não foi possível testar nenhuma hipótese até o momento.

![[Pasted image 20250320031323.png]]

## Os motores e seus drivers
### Os drivers
O circuito dos drivers é bem direto, são dois DRV8251A (um para cada motor) que recebem dois sinais de PWM cada. Esses drivers foram escolhidos por serem simples e por terem um current mirror que permite monitorar a corrente que está sendo utilizada pelos motores que poderia ser utilizado para algoritmos de controle. Porém essa função assim como o medidor de tensão da bateria não foi utilizada.

![[Pasted image 20250320031934.png]]

![[Pasted image 20250320032017.png]]

Assim como no regulador de 5V foram utilizados os capacitores de 22u com encapsulamento 0805, seria ideal utilizar um encapsulamento maior na próxima revisão do hardware para que seja possível compra-los de mais fontes.

### Os motores
Os motores também não foram uma escolha muito difícil. Com o fim de evitar complexidade mecânica do projeto foram utilizados motores N20 em que era possível utilizar uma solução já utilizada em robôs seguidores de linha em projetos anteriores. Os encoders são então encaixados no eixo do motor que se estende até a parte traseira do motor. 

![[12567_9.jpg]]

A solução se parece muito com a da foto.

Vale comentar também que considerando que o robô não precisa de muito torque e sim de velocidade foram utilizados motores com uma redução relativamente pequena de 15:1.

A solução atual mesmo que fácil de se montar não é satisfatória considerando que a baixa resolução do encoder de 12 pulsos por rotação (do eixo do motor) permite um controle com precisão de somente 2 graus na roda.

![[0J6832.1200.jpg]]

## O microcontrolador
O microcontrolador é o cérebro da placa, ele interage com todos os periféricos mencionados anteriormente e garante que o robô vai completar o trajeto. O MCU escolhido foi o STM32F411 por ter capacidade de processamento mais do que suficiente para o projeto e pelo fácil acesso a placas de desenvolvimento. Além disso vale mencionar que a interface do IDE da ST o stm32CubeIDE foi incrivelmente útil no desenvolvimento do hardware por permitir visualizar facilmente as funcionalidades de cada pino.

Como mencionado anteriormente no projeto são utilizados o ADC, interface SPI e UART e timers do microcontrolador para gerar o PWM e outras tarefas.

![[Pasted image 20250320034053.png]]

O microcontrolador é programado com um STLINK V2 por meio de um pin header

![[Pasted image 20250320034213.png]]

Além disso o microcontrolador se comunica com um módulo Bluetooth HC-06 por meio de uma interface UART

### O módulo Bluetooth

O módulo Bluetooth escolhido foi um HC-06 pela facilidade de uso e por já ter sido usado previamente.

![[m-dulo-bluetooth-hc-06-12715-2522_2_1.jpg]]

O módulo inicialmente funcionou bem com a ressalva de que era preciso conecta-lo somente após a placa ter sido energizada. A teoria inicial era de que  pela tensão subir lentamente no rail de 3.3V algum circuito de proteção no módulo era ativado, porém após ao trocar o módulo por um outro HC-06 ele não era energizado mesmo seguindo o procedimento anterior. A conclusão que foi chegada no final foi de que o módulo só trabalha adequadamente com uma tensão superior a 5V diferente do que era anunciado por lojas online.

![[Pasted image 20250320034832.png]]

### Vale mencionar também
A placa possuí 2 LED´s RGB para debug, no entanto os resistores utilizados no design foram de um valor inicialmente muito pequenos fazendo que o brilho dos LED´s fosse muito forte. Os resistores foram posteriormente trocados por resistores de 1k para eliminar o problema.

![[Pasted image 20250320035153.png]]

![[MFG_475~C67062-A0226-A3-03~~6_web(640x640).jpg]]

## A placa
![[Pasted image 20250320035350.png]]

Foram necessárias 3 revisões da placa até chegar no resultado da imagem acima. A placa utiliza quatro camadas com o seguinte stackup: 
1- Sinais (Maior parte roteados aqui por conta da proximidade da layer de GND)
2- GND
3- Alimentação
4- Sinais (Somente sinais que precisaram estar nessa camada)

![[Pasted image 20250320035644.png]]
A layer superior é onde estão maior parte dos sinais e teve um roteamento bem direto.

![[Pasted image 20250320035816.png]]
Avaliando atualmente o projeto a separação entre a parte de potência da placa do resto no plano de terra foi desnecessária e pode ate ter mesmo interferido na performance de EMC dela. 
![[Pasted image 20250320040008.png]]
É possível visualizar os 3.3V em amarelo, os 5V na única trilha da camada indo somente para o LED RGB e a tensão da bateria em laranja alimentado os drivers.
![[Pasted image 20250320040159.png]]

A camada inferior com seu pequeno número de conexões.

## Fabricação
A fabricação foi bem simples, após os componentes e a PCB chegarem foi utilizado um stencil e solda em pasta para solda-los. O processo foi rápido e poupou muito trabalho.

![[Sem título 1.jpg]]
## Notas finais

O projeto mesmo com os problemas citados anteriormente funciona fenomenalmente bem e, considerando que em menos de um mês o projeto do hardware foi finalizado, foi um sucesso bem grande. Eu acredito que esse design é uma ótima inspiração para quem está começando com a categoria Micromouse.

Eu espero que esse artigo/post de blog tenha te dado uma ideia do que levar em consideração quando fazendo um projeto desse tipo.

![[Sem título 2.jpg]]

Os arquivos do projeto estão no meu github: https://github.com/Gugamariz/Mycro/tree/main