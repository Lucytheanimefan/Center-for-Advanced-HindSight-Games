import random, pygame, sys
from pygame.locals import *
import pygbutton

(WIDTH,HEIGHT)=(600,700)

# colors
RED=(255,0,0)
LIGHT_BLUE=(142,180,215)#background color
WHITE=(255,255,255)

#frames per second
FPS=30
fpsClock=pygame.time.Clock()

#setup
DISPLAYSURF=pygame.display.set_mode((WIDTH,HEIGHT))
pygame.display.set_caption('Bowling game')
DISPLAYSURF.fill(LIGHT_BLUE)

#graphics/images
alpha=128
PIN_Y=50 #uppermost left pin y-coordinate
PIN_X=20 #uppermost left pin x-coordinate
pin_solid=pygame.image.load('bowling_pin_solid.png')
PIN_SOLID=pygame.transform.scale(pin_solid, (55,129))
pin_knocked=pygame.image.load('bowling_pin_transparent.png')
PIN_KNOCKED=pygame.transform.scale(pin_knocked, (55,129))
BALL_Y=570
BALL_X=30

#buttons
throwball=pygame.image.load('throwballbutton.png')
THROWBALL=pygame.transform.scale(throwball, (30, 250))
nextround=pygame.image.load('nextroundbutton.png')
NEXTROUND=pygame.transform.scale(nextround, (30, 250))

#initialize game
pygame.init()

#fonts and text
myfont=pygame.font.Font(None,30)
ballsleft_label="Balls left"
round_label=myfont.render("Round",1,WHITE)
points_label=myfont.render("Points",1,WHITE)

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
		dx=dx+160
	dx=0
	for j in range(3):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+90+dx,PIN_Y+90))
		dx=dx+150
	dx=0
	for k in range(2):
		DISPLAYSURF.blit(PIN_SOLID,(PIN_X+160+dx,PIN_Y+190))
		dx=dx+140
	DISPLAYSURF.blit(PIN_SOLID,(PIN_X+230,PIN_Y+290))

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

#main game loop
while True:
    for event in pygame.event.get():
    	#display pins to knock down
    	displayPins()
    	displayBallsLeft()
    	displayRound()

    	#display text
    	lineBreakText(ballsleft_label,40,510)
    	DISPLAYSURF.blit(round_label,(10,10))
    	DISPLAYSURF.blit(points_label,(500,550))

        if event.type==QUIT:
            pygame.quit()
            sys.exit()
    pygame.display.update()
    