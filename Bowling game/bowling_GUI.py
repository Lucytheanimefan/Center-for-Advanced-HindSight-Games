import random, pygame, sys
from random import randint, shuffle
from pygame.locals import *
import pygbutton

#game variables
BALL_COUNT=15
PINS=10
ROUNDS=10

# colors
RED=(255,0,0)
LIGHT_BLUE=(142,180,215)#background color
WHITE=(255,255,255)

#frames per second
FPS=30
fpsClock=pygame.time.Clock()

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

#initialize game
pygame.init()

#fonts and text
myfont=pygame.font.Font(None,30)
ballsleft_label="Balls left"
round_label=myfont.render("Round",1,WHITE)
points_label=myfont.render("Points",1,WHITE)


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

randnums=random.sample(xrange(0,10),10)
print randnums

#update pins GUI after a certain number are knocked down
def updatePins(pinsLeft, randnums):
	num_knocked=10-pinsLeft
	if num_knocked==0:
		print 'None knocked down'
	else:
		print "Range: "
		print range(num_knocked)
		for i in range(num_knocked):
			print "Randnums: "
			print randnums
			DISPLAYSURF.blit(PIN_KNOCKED,PIN_POSITIONS[randnums.pop()])

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
	print PIN_POSITIONS
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

def displayRound():
	dx=0
	for i in range(10):
		number=myfont.render(str(i+1),1,WHITE)
		DISPLAYSURF.blit(number,(100+dx, 10))
		dx=dx+45

CURRENT_SCORE=0;
def throwBall(ballcount, pinsLeft, roundsLeft, randnums):
	print "Ball count: "
	print ballcount
	if ballcount<=0:
		print 'Not enough balls'		
		#Add some GUI later
	if roundsLeft<=0:
		print 'Out of rounds'
	if pinsLeft<=0:
		print 'No more pins to knock down'
	print 'Rounds left: '
	print roundsLeft
	knocked_down=randint(0,pinsLeft);
	print 'pins knocked down: '+str(knocked_down)
	pinsLeft=pinsLeft-knocked_down
	print 'pins left'+str(pinsLeft)
	updatePins(pinsLeft, randnums) #update GUI
	#mouse=pygame.mouse.get_pos()
	return knocked_down
	

displayPins()
#--------------------------Main game loop-------------------------------------

while True:
    for event in pygame.event.get():
    	#display pins to knock down
    	displayBallsLeft()
    	displayRound()

    	#display text
    	lineBreakText(ballsleft_label,50,510)
    	DISPLAYSURF.blit(round_label,(10,10))
    	DISPLAYSURF.blit(points_label,(500,550))

    	#buttons
    	mouse=pygame.mouse.get_pos()
    	if createButton(THROWBALL,0,635,300,50,mouse)==True:
    		print '2nd randnums: '
    		print randnums
    		CURRENT_SCORE=CURRENT_SCORE+throwBall(BALL_COUNT, PINS, ROUNDS, randnums)
    		displayScore(CURRENT_SCORE)
    		BALL_COUNT-=1
    	elif createButton(NEXTROUND,300,635,300,50,mouse)==True:
			ROUNDS-=1
			CURRENT_SCORE=CURRENT_SCORE+throwBall(BALL_COUNT,10, ROUNDS, resetPins())
			displayScore(CURRENT_SCORE)
        if event.type==QUIT:
            pygame.quit()
            sys.exit()
    pygame.display.update()
