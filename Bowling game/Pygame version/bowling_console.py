'''
Created on May 17, 2016
Console version of bowling game
@author: lucy
'''
from random import randint

total_score=0
max_rounds=0 
balls=15

knocked_down=randint(0,10);
def playRound(knocked_down,num_pins):
    global total_score;
    global balls;
    total_score+=knocked_down
    num_pins-=knocked_down
    print "knocked down: "
    print knocked_down;
    print "pins left to knock down"
    print num_pins
    balls-=1;
    print "balls left: "+str(balls);
    cont=raw_input("Do you want to try again?(Y or N)");
    if cont=='Y': #try again
        knocked_down=randint(0,num_pins);
        playRound(knocked_down,num_pins);       
        
while max_rounds<11: #10 total rounds
    max_rounds+=1;
    print "Round " + str(max_rounds);
    playRound(knocked_down,10);
    print "total score: "+str(total_score);
    
    


    