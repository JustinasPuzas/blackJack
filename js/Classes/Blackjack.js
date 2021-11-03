class Blackjack {
    
    constructor(elem) { // pass "app" in as an arg 
        
        // pass <div id="app"></app> to a JS Obj
        this.app = document.getElementById(elem)
        let values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]
        let suits = ["Diamonds", "Clubs", "Hearts", "Spades"]
        this.deck = []
        
        // a nested for loop to run 52 times
        for(let i = 0; i < values.length; i++) { // run this 13x
            
            for(let j = 0; j < suits.length; j++) { // run this 4x       
                
                let numVal = 0      
                
                // is it an Ace?
                if(values[i] == "Ace") {
                    numVal = 11
                } else if(values[i].length > 3) { // "Jack", "Queen", "King"
                    numVal = 10
                } else { // It is already a number
                    numVal = values[i]
                }  
                
                let card = {     
                    fileName: `${values[i]}-of-${suits[j]}.png`,
                    value: values[i], // Queen is Queen, 3 is 3, Ace is Ace, etc.
                    numValue: numVal // Queen is 10, 3 is 3, Ace is 11, etc     
                }
                
                this.deck.push(card)  
                
            } // for loop
            
        } // for loop
        
        // Spread Operator for copying deck array 6x to shoe
        this.shoe = [ ...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck, ...this.deck]    
        
        // SHUFFLE CARDS
        for(let i = 0; i < this.shoe.length; i++) { // run this 312x
            
            // take each array item in order starting w index 0
            // and swap it w a random item
            let tempItem = this.shoe[i] // current item
            let randNum = Math.floor(Math.random()*this.shoe.length)
            this.shoe[i] = this.shoe[randNum]
            this.shoe[randNum] = tempItem    
            
        } // end for 

        // Make the DOM Elements: header goes before (above) the app div
        this.header = document.createElement('header')
        document.body.insertBefore(this.header, document.body.firstChild)
        
        this.btnDeal = document.createElement('button') // make  DEAL button
        this.btnDeal.innerHTML = "DEAL"
        this.btnDeal.addEventListener('click', this.deal.bind(this))
        this.header.appendChild(this.btnDeal)
        
        this.btnHit = document.createElement('button') // make HIT button
        this.btnHit.innerHTML = "HIT"
        this.btnHit.addEventListener('click', this.hit.bind(this))
        this.btnHit.disabled = "true"
        this.btnHit.style.opacity = "0.7"
        this.header.appendChild(this.btnHit)
        
        this.btnStand = document.createElement('button') // make STAND button
        this.btnStand.innerHTML = "STAND"
        this.btnStand.addEventListener('click', this.stand.bind(this))
        this.btnStand.disabled = "true"
        this.btnStand.style.opacity = "0.7"
        this.header.appendChild(this.btnStand)
        
        // make messageBox, playerScoreBox, dealerScoreBox and moneyBox 
        this.messageBox = document.createElement('div')
        this.messageBox.innerHTML = "CLICK DEAL TO BEGIN"
        
        // turn off the border and bg-color and make text color #FFF
        this.messageBox.style.cssText = "border:0; background-color:transparent; color:#FFF; font-size:1.1rem; width:200px; margin:0 25px"
        this.header.appendChild(this.messageBox)
        
        this.playerScoreBox = document.createElement('div')
        this.playerScoreBox.innerHTML = "Player: "
        this.header.appendChild(this.playerScoreBox)
        
        this.dealerScoreBox = document.createElement('div')
        this.dealerScoreBox.innerHTML = "Dealer: "
        this.header.appendChild(this.dealerScoreBox)
        
        this.moneyBox = document.createElement('div')
        this.moneyBox.innerHTML = "$500"
        this.header.appendChild(this.moneyBox)
        
        // 2 divs inside app div for holding cards             
        this.dealerCardBox = document.createElement('div')
        this.app.appendChild(this.dealerCardBox)
        
        this.playerCardBox = document.createElement('div')
        this.app.appendChild(this.playerCardBox)  
        
        this.myMoney = 500 // player's starting $

    } // close constructor()
    
    deal() {     // deal() method called on click of DEAL button
        
      // reinitialize
      this.player = []
      this.dealer = []
      this.playerScore = 0
      this.dealerScore = 0
        
      // keep track of the value of all aces played
      this.playerAceScore = 0
      this.dealerAceScore = 0
        
      // clear the boxes before dealing a new hand
      this.playerCardBox.innerHTML = ''
      this.dealerCardBox.innerHTML = ''
      this.playerScoreBox.innerHTML = 'Player:'
      this.dealerScoreBox.innerHTML = 'Dealer:'
      this.messageBox.innerHTML = 'GOOD LUCK!'
        
      // add HIT and STAND btns after the DEAL button 
      this.btnStand = document.createElement('button') // make STAND button
      this.btnStand.innerHTML = "STAND"
      this.btnStand.addEventListener('click', this.stand.bind(this))
      this.header.replaceChild(this.btnStand, this.header.childNodes[2])
        
      this.btnHit = document.createElement('button') // make HIT button
      this.btnHit.innerHTML = "HIT"
      this.btnHit.addEventListener('click', this.hit.bind(this))
      this.header.replaceChild(this.btnHit, this.header.childNodes[1])
        
      // deal player card 1
      setTimeout(() => {
         
         // store last card object in shoe array at player[0] 
         this.player[0] = this.shoe.pop()
         let cardPic = new Image()
         cardPic.src = 'images/cards350px/' + this.player[0].fileName
         
          // output card to the player box on the table
         this.playerCardBox.appendChild(cardPic)
         
          // increment player score
         this.playerScore += this.player[0].numValue
         this.playerScoreBox.innerHTML = 'Player: '+ this.playerScore 
         
          // keep separate score of player aces
         if(this.player[0].value == "Ace") {
            this.playerAceScore += 11
         }
          
      }, 1000);
        
     // deal dealer card 1
     setTimeout(() => {
         
         // store last card object in shoe array at player[0] 
         this.dealer[0] = this.shoe.pop()
         let cardPic = new Image()
         cardPic.src = 'images/cards350px/' + this.dealer[0].fileName
         
         // output card to the player box on the table
         this.dealerCardBox.appendChild(cardPic)
         
         // increment player score
         this.dealerScore += this.dealer[0].numValue
         
         // output card value, not score: "Jack" not 10
         this.dealerScoreBox.innerHTML = 'Dealer: '+ this.dealer[0].value
         
         // keep separate score of dealer aces
         if(this.dealer[0].value == "Ace") {
            this.dealerAceScore += 11
         }
         
      }, 2000);
        
     // deal player card 2
      setTimeout(() => {
          
         // store last card object in shoe array at player[1] 
         this.player[1] = this.shoe.pop()
         let cardPic = new Image()
         cardPic.src = 'images/cards350px/' + this.player[1].fileName
          
         // output card to the player box on the table
         this.playerCardBox.appendChild(cardPic)
          
         // increment player score
         this.playerScore += this.player[1].numValue
         this.playerScoreBox.innerHTML = 'Player: '+ this.playerScore 
          
         // keep separate score of player aces
         if(this.player[1].value == "Ace") {
            this.playerAceScore += 11
         }     
          
      }, 3000);
        
     // deal dealer card 2 face-down (The Hole Card)
     setTimeout(() => {
         
         // store last card object in shoe array at dealer[1] 
         this.dealer[1] = this.shoe.pop()
         let cardPic = new Image()
         cardPic.src = 'images/cards350px/0-Back-of-Card-Red.png'
         
         // output card to the dealer box on the table
         this.dealerCardBox.appendChild(cardPic)
         
         // increment dealer score
         this.dealerScore += this.dealer[1].numValue
         
         // keep separate score of dealer aces
         if(this.dealer[1].value == "Ace") {
            this.dealerAceScore += 11
         }      
         
      }, 4000);

     setTimeout(() => {
         
      // check to see if anyone got dealt two Aces -- does player have 2 Aces?
      if(this.playerScore == 22) { // reduce score by 10
         this.playerScore -= 10
         this.playerAceScore -= 10
         this.playerScoreBox = 'Player: ' + this.playerScore
      }
         
      if(this.dealerScore == 22) { // reduce score by 10
         this.dealerScore -= 10
         this.dealerAceScore -= 10
      }
         
      // check to see if anyone got dealt Blackjack (21)
      if(this.playerScore == 21 || this.dealerScore == 21) {   
          
          // if one hand got Blackjack, must check to see if other
          // hand is also Blackjack, resulting in a push (tie)
          if(this.playerScore == 21 && this.dealerScore == 21) {
              
             this.messageBox.innerHTML = 'BLACKJACK PUSH' // TIE
             
             this.btnHit.disabled = "true"
             this.btnHit.style.opacity = "0.7"
             this.btnStand.disabled = "true"   
             this.btnStand.style.opacity = "0.7"
              
             // prove that dealer has blackjack by flipping over hole card
             let flippedCard = this.dealerCardBox.children[1]
             flippedCard.src = 'images/cards350px/' + this.dealer[1].fileName
              
          } else { // if only one party has Blackjack, so we have a winner
              
             if(this.playerScore == 21) { // does the player have blackjack?
                 
                // if player only has Blackjack, player wins $15
                this.myMoney += 15; // 3-2 payoff for blackjack
                this.moneyBox.innerHTML = "$" + this.myMoney
                 
                // Announce BLACKJACK WINNER in message box
                this.messageBox.innerHTML = 'BLACKJACK!<br/>YOU WIN!'
                
                this.btnHit.disabled = "true"
                this.btnHit.style.opacity = "0.7"
                this.btnStand.disabled = "true"   
                this.btnStand.style.opacity = "0.7"
                 
                // if player ONLY has blackjack but dealer does not, BUT they do have 10 or Ace up, then turn over the Hole Card.
                 
                if(this.dealer[0].numVal >= 10) {
                    
                    let flippedCard = this.dealerCardBox.children[1];
                    flippedCard.src = 'images/cards350px/' + this.dealer[1].fileName
                    
                } 
                 
            } else { // if dealer only has Blackjack, player loses $10 
                
                this.myMoney -= 10; // LOSE
                this.moneyBox.innerHTML = "$" + this.myMoney;
                this.messageBox.innerHTML = 'DEALER HAS BLACKJACK!<br/>YOU LOSE!'
                
                this.btnHit.disabled = "true"
                this.btnHit.style.opacity = "0.7"
                this.btnStand.disabled = "true"   
                this.btnStand.style.opacity = "0.7"
                
                // if dealer has blackjack, turn over the Hole Card
                let flippedCard = this.dealerCardBox.children[1];
                flippedCard.src = 'images/cards350px/' + this.dealer[1].fileName  
            }    
          }
          
        } else { // no one has blackjack    
            this.messageBox.innerHTML = "HIT OR STAND"    
        }  
         
      }, 4500);
        
    } // deal()
    
    hit() {
        
        // what does the hit() method need to do?
        // pop another card object from the shoe
        this.hitCard = this.shoe.pop()
        
        // make a card image
        let cardPic = new Image()
        cardPic.src = 'images/cards350px/' + this.hitCard.fileName  
        
        // output the card pic to the player card box
        this.playerCardBox.appendChild(cardPic)   
        
        // if hit card is an Ace
        if(this.hitCard.value == "Ace") {
            
            // check to see if Ace needs to be 11 or 1
            if(this.playerScore < 11) { 
                
                // make it an Ace-11
                this.playerScore += 11
                this.playerAceScore += 11
                
            } else { // score is too high already for an Ace 11
                
                this.playerScore++
                this.playerAceScore++
            } 
            
        } else { // if it's not an Ace, add the numValue 
            this.playerScore += this.hitCard.numValue
        }   
        
        // update the player's score
        this.playerScoreBox.innerHTML = 'Player: ' + this.playerScore     
        
        // what if the player busts?
        if(this.playerScore > 21) {
            
           // if player has an Ace-11:
           if(this.playerAceScore >= 11) {
               
              // save player from busting by resetting value of Ace to 1:
              this.playerAceScore -= 10
              this.playerScore -= 10
              this.playerScoreBox.innerHTML = 'Player: ' + this.playerScore
               
           } else { // else player has no Ace-11...BUSTED! 
               
               this.messageBox.innerHTML = "BUSTED!<br/>YOU LOSE"
               this.myMoney -= 10
               this.moneyBox.innerHTML = '$' + this.myMoney
               
               this.btnHit.disabled = "true"
               this.btnHit.style.opacity = "0.7"
               this.btnStand.disabled = "true"   
               this.btnStand.style.opacity = "0.7"
               
           }
            
        }
        
        if(this.playerScore == 21) { // if player has 21 (not blackjack, but 21 from 3+ cards, disable btns and call stand method)
                
            this.btnHit.disabled = "true"
            this.btnHit.style.opacity = "0.7"
            this.btnStand.disabled = "true"   
            this.btnStand.style.opacity = "0.7"
            
            // call stand automatically after pause
            this.messageBox.innerHTML = "YOU HAVE 21!<br/>DEALER'S TURN!"

            setTimeout(() => {
                this.stand()
            }, 1000)
            
        }
        return
    } // hit()
    
    stand() {

        this.btnHit.disabled = "true"
        this.btnHit.style.opacity = "0.7"
        this.btnStand.disabled = "true"   
        this.btnStand.style.opacity = "0.7"
        
        // give dealer card IF dealerScore < 17 or if has soft 17
        setTimeout(() => {
            
            // start by revealing the hole card
            this.dealerCardBox.children[1].src = "images/cards350px/" + this.dealer[1].fileName
            this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerScore
            
        }, 1250)
            
        setTimeout(() => {    // if dealer has less than 17, or if dealer has soft 17, dealer gets another card
            if(this.dealerScore < 17 || (this.dealerScore == 17 && this.dealerAceScore >= 11)) {
                
                this.dealerCard = this.shoe.pop() // dealer's new card obj
                let cardPic = new Image() // make a card image
                cardPic.src = 'images/cards350px/' + this.dealerCard.fileName
                
                // output the card pic to the dealer card box
                this.dealerCardBox.appendChild(cardPic)
                
                // check if card is an Ace, and if so, score it 11 or 1
                // if dealer card is an Ace
                if(this.dealerCard.value == "Ace") {
                    
                     // check to see if Ace needs to be 11 or 1
                     if(this.dealerScore < 11) {
                        
                        // make it an Ace-11
                        this.dealerScore += 11
                        this.dealerAceScore += 11
                        
                     } else { // score is too high for an Ace 11
                        
                        this.dealerScore++
                        this.dealerAceScore++
                     }
                    
                     this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerScore
                    
                  } else { // not an ace, so add num value, but if dealer busts, check if dealer has an Ace-11 to reassign as Ace-1
                    
                    this.dealerScore += this.dealerCard.numValue
                    
                    // does the new card but the dealer's score over 21 (bust)?
                    if(this.dealerScore > 21) { 
                        
                        // if dealer has Ace-11, reassign it as Ace-1 to avoid busting
                        if(this.dealerAceScore > 10) {
                            
                            this.dealerScore -= 10
                            this.dealerAceScore -= 10
                            
                        } else { // dealer has no Ace-11 to reassign and dealerScore > 21, so dealer BUSTS
                            
                            this.messageBox.innerHTML = 'DEALER BUSTED!<br/>YOU WIN!'
                            this.myMoney += 10
                            this.moneyBox.innerHTML = '$' + this.myMoney
                            this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerScore
                        }
                        
                     }
                     this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerScore
                      
                  } // not an Ace
                
                  this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerScore
                
                } // if dealer gets a card
            
                // dealer did not bust, but is done getting cards
                if((this.dealerScore > 16 && this.dealerAceScore < 11) || (this.dealerScore > 17 && this.dealerAceScore > 10)) {

                    // compare the 2 scores to see who won
                    if(this.playerScore > this.dealerScore) { // if player won

                        this.messageBox.innerHTML = 'YOU WIN!'
                        this.myMoney += 10
                        this.moneyBox.innerHTML = '$' + this.myMoney
                        this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerScore

                    } else if(this.playerScore < this.dealerScore && this.dealerScore < 22) { // if dealer won

                        this.messageBox.innerHTML = 'YOU LOSE!'
                        this.myMoney -= 10
                        this.moneyBox.innerHTML = '$' + this.myMoney
                        this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerScore

                    } else { // this.playerScore == this.dealerScore, so nobody won -- it's a tie
                        if(this.dealerScore < 22) {
                            this.messageBox.innerHTML = 'PUSH!'
                            this.dealerScoreBox.innerHTML = 'Dealer: ' + this.dealerScore
                        }
                    }

                }
            
                // soft 17 msg
                if(this.dealerScore == 17 && this.dealerAceScore >= 11) {
                    this.messageBox.innerHTML = 'DEALER HAS SOFT 17'
                }

                // if after having gotten another card, dealer's score still requires ANOTHER card
                if(this.dealerScore < 17 || (this.dealerScore == 17 && this.dealerAceScore >= 11)) {
                    this.stand()
                }
                            
            }, 2500) // setTimeout
            return
            
        } // stand()
    
} // close Blackjack class