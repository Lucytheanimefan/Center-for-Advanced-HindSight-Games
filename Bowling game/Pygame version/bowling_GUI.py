import random, pygame, sys
from random import randint
from pygame.locals import *

#game variables
BALL_COUNT=15
PINS=10
ROUNDS=10

# colors
RED=(255,0,0)
LIGHT_BLUE=(142,180,215)#background color
WHITE=(255,255,255)
DARK_BLUE=(0,0,128)

#setup background
(WIDTH,HEIGHT)=(600,700) 
DISPLAYSURF=pygame.display.set_mode((WIDTH,HEIGHT))
pygame.display.set_caption('Bowling game')
DISPLAYSURF.fill(LIGHT_BLUE)
pygame.draw.rect(DISPLAYSURF,WHITE,(0,620,600,80))

#graphics/image variables
alpha=128
PIN_Y=50 #uppermost left pin y-coordinate
PIN_X=20 #uppermost left pin x-coordinate
pin_solid=pygame.image.load('bowling_pin_solid.png')
PIN_SOLID=pygame.transform.scale(pin_solid, (55,129))
pin_knocked=pygame.image.load('bowling_pin_transparent.png')
PIN_KNOCKED=pygame.transform.scale(pin_knocked, (55,129))
BALL_Y=570
BALL_X=30
PIN_POSITIONS=[]
blue_cover=pygame.image.load('blue.png')
blue_cover=pygame.transform.scale(blue_cover, (30,30))

#buttons
throwball=pygame.image.load('throwballbutton.png')
THROWBALL=pygame.transform.scale(throwball, (300, 50))
nextround=pygame.image.load('nextroundbutton.png')
NEXTROUND=pygame.transform.scale(nextround, (300, 50))

throwball_clicked=pygame.image.load('throwballbutton_clicked.png')
THROWBALL_CLICKED=pygame.transform.scale(throwball_clicked, (300, 50))
nextround_clicked=pygame.image.load('nextroundbutton_clicked.png')
NEXTROUND_CLICKED=pygame.transform.scale(nextround_clicked, (300, 50))

randnums=random.sample(xrange(0,10),10)

#initialize game
pygame.init()

#fonts and text
myfont=pygame.font.Font(None,30)
ballsleft_label="Balls left"
round_label=myfont.render("Round",1,WHITE)
points_label=myfont.render("Points",1,WHITE)
endfont=pygame.font.Font(None, 70)
GAMEOVER=endfont.render("Game Over", True, WHITE)

def createButton(button,x,y,width, height, mousePos):
	clicked=False 
	DISPLAYSURF.blit(button,(x,y))
	click=pygame.mouse.get_pressed()
	if click[0]==1:
		if x+width>mousePos[0]>x and y+height>mousePos[1]>y:
			clicked=True
	return clicked

def lineBreakText(text,x,y):
	lines=text.split()
	for i in lines:
		dy=0
		text=myfont.render(i,1, WHITE)
		DISPLAYSURF.blit(text, (x,y))
		dy=dy+20
		y=y+dy

def displayPins():
	dx=0
	for i in range(4):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+dx,PIN_Y))
		PIN_POSITIONS.append((PIN_X+dx,PIN_Y))
		dx=dx+160
	dx=0
	for j in range(3):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+90+dx,PIN_Y+90))
		PIN_POSITIONS.append((PIN_X+90+dx,PIN_Y+90))
		dx=dx+150
	dx=0
	for k in range(2):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+160+dx,PIN_Y+190))
		PIN_POSITIONS.append((PIN_X+160+dx,PIN_Y+190))
		dx=dx+140
	DISPLAYSURF.blit(PIN_SOLID,(PIN_X+230,PIN_Y+290))
	PIN_POSITIONS.append((PIN_X+230,PIN_Y+290))
	return PIN_POSITIONS

def displayScore(score):
	DISPLAYSURF.blit(blue_cover, (500,500))
	dispScore=myfont.render(str(score),5,WHITE)
	DISPLAYSURF.blit(dispScore, (500,500))

def resetPins():
	randnums=random.sample(xrange(0,10),10)
	dx=0
	for i in range(4):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+dx,PIN_Y))
		PIN_POSITIONS.append((PIN_X+dx,PIN_Y))
		dx=dx+160
	dx=0
	for j in range(3):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+90+dx,PIN_Y+90))
		PIN_POSITIONS.append((PIN_X+90+dx,PIN_Y+90))
		dx=dx+150
	dx=0
	for k in range(2):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+160+dx,PIN_Y+190))
		PIN_POSITIONS.append((PIN_X+160+dx,PIN_Y+190))
		dx=dx+140
	DISPLAYSURF.blit(PIN_SOLID,(PIN_X+230,PIN_Y+290))
	return randnums

def displayBallsLeft():
	dx=0
	for i in range(15):
		BALL=pygame.draw.circle(DISPLAYSURF, WHITE, (BALL_X+dx,BALL_Y),10,0)
		dx=dx+30

def updateBalls(ballcount):
	DISPLAYSURF.blit(blue_cover,(20,520))
	dx=30
	count=15-ballcount
	if count>15:
		raise ValueError('Out of balls')
	ballsleft=myfont.render(str(ballcount),1,WHITE)
	DISPLAYSURF.blit(ballsleft,(20, 520))
	for i in range(count):
		pygame.draw.circle(DISPLAYSURF, DARK_BLUE, (BALL_X+dx*i, BALL_Y), 10, 0)

def displayRound():
	dx=0
	for i in range(10):
		number=myfont.render(str(i+1),1,WHITE)
		DISPLAYSURF.blit(number,(100+dx, 10))
		dx=dx+45

#update rounds GUI
def updateRound(round):
	r=15
	dx=45
	if round>=10:
		raise ValueError('Out of rounds')
	pygame.draw.circle(DISPLAYSURF, WHITE, (106+dx*round, 6+r), r)
	number=myfont.render(str(round+1),1,DARK_BLUE)
	DISPLAYSURF.blit(number,(100+dx*round, 10))	

#update pins GUI after a certain number are knocked down
def updatePins(knocked_down, randnums):
	#num_knocked=10-pinsLeft
	if knocked_down==0:
		print 'None knocked down'
	else:
		for i in range(min(knocked_down, len(randnums))):
			DISPLAYSURF.blit(PIN_KNOCKED,PIN_POSITIONS[randnums.pop()])


CURRENT_SCORE=0;
def throwBall(ballcount, pinsLeft, roundsLeft, randnums):
	print "Ball count: "
	print ballcount
	if ballcount<=0:
		print 'Not enough balls'
		return 0		
		#Add some GUI later
	elif roundsLeft<=0:
		print 'Out of rounds'
		return 0
	elif pinsLeft<=0:
		print 'No more pins to knock down'
		return 0
	else:
		print 'Rounds left: '
		print roundsLeft
		knocked_down=randint(0,pinsLeft);
		print 'pins knocked down: '+str(knocked_down)
		pinsLeft=pinsLeft-knocked_down
		print 'pins left'+str(pinsLeft)
		updatePins(knocked_down, randnums) #update GUI
		return knocked_down
	
def gameover():
	if ROUNDS<=0 or BALL_COUNT<=0:
		pygame.draw.rect(DISPLAYSURF,LIGHT_BLUE, (200,500,100,50))
		DISPLAYSURF.blit(GAMEOVER, (200,500))


displayPins()
#--------------------------Main game loop-------------------------------------

while True:
    for event in pygame.event.get():
    	displayBallsLeft()
    	displayRound()

    	lineBreakText(ballsleft_label,50,510)
    	DISPLAYSURF.blit(round_label,(10,10))
    	DISPLAYSURF.blit(points_label,(500,550))

    	updateRound(10-ROUNDS)
    	updateBalls(BALL_COUNT)
    	mouse=pygame.mouse.get_pos()
    	if createButton(THROWBALL,0,635,300,50,mouse)==True:
    		DISPLAYSURF.blit(THROWBALL_CLICKED,(0,635))
    		print randnums
    		knocked_down=throwBall(BALL_COUNT, PINS, ROUNDS, randnums)
    		CURRENT_SCORE=CURRENT_SCORE+knocked_down
    		displayScore(CURRENT_SCORE)
    		BALL_COUNT-=1
    		PINS=PINS-knocked_down

    		gameover()
    	elif createButton(NEXTROUND,300,635,300,50,mouse)==True:
    		print 'NEW ROUND'
    		ROUNDS=ROUNDS-1;
    		PINS=10;
    		DISPLAYSURF.blit(NEXTROUND_CLICKED,(300,635))
    		randnums=resetPins() #reset randnums
    		displayScore(CURRENT_SCORE)
    		gameover()#Game over!

    	if event.type==QUIT:
            pygame.quit()
            sys.exit()

    pygame.display.update()

